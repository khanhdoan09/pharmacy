package com.project.pharmacy.request;

import lombok.Data;

@Data
public class ActiveAccountRequest {
    private String email;
    private String activeCodeValue;
}
