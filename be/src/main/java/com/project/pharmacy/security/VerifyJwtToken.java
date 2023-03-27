package com.project.pharmacy.security;

import com.project.pharmacy.entity.User;

public interface VerifyJwtToken {
    boolean verifyJwtToken(String authToken);
    String getAccountType();
    User getUser();

}
