package com.project.pharmacy.security;

import com.project.pharmacy.dto.UserInfoJwtDto;
import com.project.pharmacy.exception.CustomException;
import org.json.JSONObject;
import com.project.pharmacy.entity.User;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {
    private final String JWT_SECRET = "lodaaaaaa";

    private final long JWT_EXPIRATION = 604800000L;

    public String generateToken(String email, String name, String avatar,String role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);
        // Tạo chuỗi json web token từ id của user.
        return Jwts.builder()
                .claim("email", email)
                .claim("name", name)
                .claim("avatar", avatar)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
    }

    public boolean validateToken(String authToken) throws CustomException {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex) {
            throw new CustomException(HttpStatus.UNAUTHORIZED, "Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            throw new CustomException(HttpStatus.UNAUTHORIZED, "Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            throw new CustomException(HttpStatus.UNAUTHORIZED, "Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            throw new CustomException(HttpStatus.UNAUTHORIZED, "JWT claims string is empty.");
        }
    }

    public User getUserFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();
        User user = new User();
        user.setEmail(String.valueOf(claims.get("email")));
        user.setName(String.valueOf(claims.get("name")));
        user.setAvatar(String.valueOf(claims.get("avatar")));
        return user;
    }
}
