package com.project.pharmacy.security;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.DefaultJwtSignatureValidator;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Base64;
import java.util.Calendar;

public class VerifyJwtTokenByNormal implements VerifyJwtToken {
    JSONObject jsonObject;

    @Override
    public boolean verifyJwtToken(String authToken) throws CustomException {
        String[] chunks = authToken.split("\\.");

        Base64.Decoder decoder = Base64.getUrlDecoder();

        String header = new String(decoder.decode(chunks[0]));
        String payload = new String(decoder.decode(chunks[1]));

        SignatureAlgorithm sa = SignatureAlgorithm.HS256;
        SecretKeySpec secretKeySpec = new SecretKeySpec("372d84af4d2b2511f17388fd44f82e22a53e3a1b51abfd961136710a7fead146".getBytes(), sa.getJcaName());
        DefaultJwtSignatureValidator validator = new DefaultJwtSignatureValidator(sa, secretKeySpec);
        String tokenWithoutSignature = chunks[0] + "." + chunks[1];
        String signature = chunks[2];
        if (!validator.isValid(tokenWithoutSignature, signature)) {
            throw new CustomException(HttpStatus.UNAUTHORIZED, "Could not verify JWT token integrity!");
        }
        jsonObject = new JSONObject(payload);
//        System.out.println(jsonObject);
        return true;
    }

    @Override
    public String getAccountType() {
        return "Normal";
    }

    @Override
    public User getUser() {
        String email = jsonObject.getString("email");
        String password = jsonObject.getString("password");
//        name
//        phone
//        birthday
        User u = new User(email, email, password, "", "", getAccountType(),
                          "avatar", "client");
        System.out.println(u);
        return u;
    }
}
