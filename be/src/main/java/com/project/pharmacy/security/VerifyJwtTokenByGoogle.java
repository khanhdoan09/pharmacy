package com.project.pharmacy.security;

import com.nimbusds.jose.Algorithm;
import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import org.json.JSONObject;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;

public class VerifyJwtTokenByGoogle implements VerifyJwtToken {
    JSONObject jsonObject;

    @Override
    public boolean verifyJwtToken(String authToken) throws CustomException {
        String[] base64EncodedSegments = authToken.split("\\.");
        String base64EncodedHeader = base64EncodedSegments[0];
        String base64EncodedClaims = base64EncodedSegments[1];
        byte[] claims = new byte[1000000];
        claims = DatatypeConverter.parseBase64Binary(base64EncodedClaims);
        String s = new String(claims);
        if (s != null) {
            jsonObject = new JSONObject(s);
            return true;
        }
        return false;
    }

    @Override
    public String getAccountType() {
        return "Google";
    }

    @Override
    public User getUser() {
        String name = jsonObject.getString("name");
        String email = jsonObject.getString("email");
        String avatar = jsonObject.getString("picture");
        String password = jsonObject.getString("user_id");

        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Calendar cal = Calendar.getInstance();

        User u = null;
        try {
            String salt = getSalt();
            String hashPassword = get_SHA_256_SecurePassword(password, salt);
            u = new User(name, email, hashPassword, "", dateFormat.format(cal.getTime()), getAccountType(), avatar, "client");
//            System.out.println(u);
        } catch (NoSuchAlgorithmException e) {

        }
        return u;
    }

    private static String get_SHA_256_SecurePassword(String passwordToHash,
                                                     String salt) {
        String generatedPassword = null;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt.getBytes());
            byte[] bytes = md.digest(passwordToHash.getBytes());
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < bytes.length; i++) {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16)
                                  .substring(1));
            }
            generatedPassword = sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return generatedPassword;
    }

    private static String getSalt() throws NoSuchAlgorithmException {
        SecureRandom sr = SecureRandom.getInstance("SHA1PRNG");
        byte[] salt = new byte[16];
        sr.nextBytes(salt);
        return salt.toString();
    }

}
