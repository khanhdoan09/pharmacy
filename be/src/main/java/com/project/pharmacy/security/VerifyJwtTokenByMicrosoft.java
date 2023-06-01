package com.project.pharmacy.security;

import com.auth0.jwk.Jwk;
import com.auth0.jwk.JwkException;
import com.auth0.jwk.JwkProvider;
import com.auth0.jwk.JwkProviderBuilder;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.interfaces.RSAPublicKey;
import java.time.Instant;
import java.util.Base64;

@Data
public class VerifyJwtTokenByMicrosoft implements VerifyJwtToken {

    private Base64.Decoder decoder = Base64.getUrlDecoder();
    private JsonObject jsonObject;

    @Override
    public boolean verifyJwtToken(String authToken) throws CustomException {
        String[] chunks = authToken.split("\\.");
        String payload = new String(decoder.decode(chunks[1]));
        JsonObject json = new Gson().fromJson(payload, JsonObject.class);
        setJsonObject(json);
        String tid = json.get("tid").toString();
        tid = tid.substring(1, tid.length() - 1);
        String ver = json.get("ver").toString();
        ver = ver.substring(1, ver.length() - 1);
        String uri = "https://login.microsoftonline.com/" + tid + "/discovery/v" + ver + "/keys";
        try {
            // verifySignature
            JwkProvider jwkProvider = new JwkProviderBuilder(new URL(uri)).build();
            DecodedJWT decodedJWT = JWT.decode(authToken);
            Jwk jwk = jwkProvider.get(decodedJWT.getKeyId());
            Algorithm algorithm = Algorithm.RSA256((RSAPublicKey) jwk.getPublicKey(), null);
            algorithm.verify(decodedJWT);
            JsonObject payloadAsJson = decodeTokenPayloadToJsonObject(decodedJWT);
            if (hasTokenExpired(payloadAsJson)) {
                throw new CustomException(HttpStatus.UNAUTHORIZED, "token has expired");
            }
        } catch (JwkException | SignatureVerificationException | MalformedURLException ex) {
            System.out.println(ex.getMessage());
            throw new CustomException(HttpStatus.UNAUTHORIZED, "token is not invalid");
        }
        return true;
    }

    @Override
    public String getAccountType() {
        return "Microsoft";
    }

    @Override
    public User getUser() {
        String name = String.valueOf(jsonObject.get("name"));
        String email = String.valueOf(jsonObject.get("preferred_username"));
        String password = String.valueOf(jsonObject.get("preferred_username"));
        String role = null;
        if (jsonObject.get("scp").toString().contains("user.read"))
            role = "client";
        User user = new User(name.substring(1, name.length() - 1), email.substring(1, email.length() - 1),
                             password.substring(1, password.length() - 1), null, null, null, null, role);
        return user;
    }

    private boolean hasTokenExpired(JsonObject payloadAsJson) {
        Instant expirationDatetime = extractExpirationDate(payloadAsJson);
        return Instant.now().isAfter(expirationDatetime);
    }

    private Instant extractExpirationDate(JsonObject payloadAsJson) {
        try {
            return Instant.ofEpochSecond(payloadAsJson.get("exp").getAsLong());
        } catch (NullPointerException ex) {
            System.out.println(ex.getMessage());
        }
        return null;
    }

    private JsonObject decodeTokenPayloadToJsonObject(DecodedJWT decodedJWT) {
        try {
            String payloadAsString = decodedJWT.getPayload();
            return new Gson().fromJson(new String(
                    Base64.getDecoder().decode(payloadAsString),
                    StandardCharsets.UTF_8), JsonObject.class);
        } catch (RuntimeException exception) {
            System.out.println("invalid JWT");
        }
        return null;
    }

}
