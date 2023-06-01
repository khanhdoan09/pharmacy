package com.project.pharmacy.security;

import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.utils.CryptoUtils;
import org.json.JSONObject;


import javax.xml.bind.DatatypeConverter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
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
        s += "}";
        StringBuilder b = new StringBuilder(s);

        b.insert(s.length() -  33, "}");

        if (s != null) {
            jsonObject = new JSONObject(b.toString());
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
        System.out.println(jsonObject);
        CryptoUtils cryptoUtils = new CryptoUtils();
        String name = jsonObject.getString("name");
        String email = jsonObject.getString("email");
        String avatar = jsonObject.getString("picture");
        String password = jsonObject.getString("user_id");

        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Calendar cal = Calendar.getInstance();

        User newUser = new User(name, email, cryptoUtils.encrypted(password), "", dateFormat.format(cal.getTime()),
                                getAccountType(), avatar, "client");
        return newUser;
    }


}
