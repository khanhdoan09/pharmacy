package com.project.pharmacy.security;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.project.pharmacy.entity.User;
import lombok.Data;

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
    public boolean verifyJwtToken(String authToken) {
        String graph = "https://graph.facebook.com/me?fields=permissions,name&access_token=" + authToken;
        URL graphURL = null;
        try {
            graphURL = new URL(graph);
            HttpURLConnection connect = (HttpURLConnection) graphURL.openConnection();
            BufferedReader br = new BufferedReader(new InputStreamReader(connect.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null)
                sb.append(line + "\n");
            System.out.println(sb);
            JsonObject json = new Gson().fromJson(sb.toString(), JsonObject.class);
            setJsonObject(json);
        } catch (MalformedURLException e) {
            return false;
        } catch (IOException e) {
            return false;
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
        String password = String.valueOf(jsonObject.get("id"));
        User user = new User(name.substring(1, name.length() - 1), email.substring(1, email.length() - 1),
                             password.substring(1, password.length() - 1), null, null, null, null, "client");
        return user;
    }
}
