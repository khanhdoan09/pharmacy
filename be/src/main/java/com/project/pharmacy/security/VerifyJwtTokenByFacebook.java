package com.project.pharmacy.security;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

@Data
public class VerifyJwtTokenByFacebook implements VerifyJwtToken {
    private JsonObject jsonObject;
    @Override
    public boolean verifyJwtToken(String authToken) throws CustomException{
        String graph = "https://graph.facebook.com/me?fields=permissions,name,email&access_token=" + authToken;
        URL graphURL = null;
        try {
            graphURL = new URL(graph);
            HttpURLConnection connect = (HttpURLConnection) graphURL.openConnection();
            BufferedReader br = new BufferedReader(new InputStreamReader(connect.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null)
                sb.append(line + "\n");
            JsonObject json = new Gson().fromJson(sb.toString(), JsonObject.class);
            setJsonObject(json);
            System.out.println(json);
        } catch (IOException e) {
            throw new CustomException(HttpStatus.UNAUTHORIZED, "token is invalid");
        }
        return true;
    }

    @Override
    public String getAccountType() {
        return "Facebook";
    }

    @Override
    public User getUser() {
        String name = String.valueOf(jsonObject.get("name"));
        String email =  String.valueOf(jsonObject.get("email"));
        String password = String.valueOf(jsonObject.get("email"));
        User user = new User(name.substring(1, name.length() - 1), email.substring(1, email.length() - 1),
                             password.substring(1, password.length() - 1), null, null, "Facebook", null, "client");
        return user;
    }
}
