package com.project.pharmacy.security;

import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;

public interface VerifyJwtToken {
    boolean verifyJwtToken(String authToken) throws CustomException;
    String getAccountType();
    User getUser();

}
