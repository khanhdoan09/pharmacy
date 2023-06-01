package com.project.pharmacy.security;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.DefaultJwtSignatureValidator;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Base64;
import java.util.Calendar;

public class VerifyJwtTokenByNormal implements VerifyJwtToken {
    private User user;
    private JwtTokenProvider jwtTokenProvider = new JwtTokenProvider();

    @Override
    public boolean verifyJwtToken(String authToken) throws CustomException {
        jwtTokenProvider.validateToken(authToken);
        user = jwtTokenProvider.getUserFromJWT(authToken);
        return true;
    }

    @Override
    public String getAccountType() {
        return "Normal";
    }

    @Override
    public User getUser() {
        User u = new User(user.getName(), user.getEmail(), "", "", "", user.getAccountType(),
                          user.getAvatar(), "client");
        return u;
    }
}
