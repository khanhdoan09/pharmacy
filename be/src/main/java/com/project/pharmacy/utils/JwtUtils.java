package com.project.pharmacy.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtUtils {
    private static final String SECRET_KEY = "`yourSecretKey`";

    public String generateJwtToken(Object object) {
        JwtBuilder jwtBuilder = Jwts.builder()
                .setSubject(object.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(Long.MAX_VALUE))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY);

        return jwtBuilder.compact();
    }

    public static void main(String[] args) {
        JwtUtils jwtUtils = new JwtUtils();
        String s = new String("leminhchanh");
        System.out.println(jwtUtils.generateJwtToken(s));
    }
}
