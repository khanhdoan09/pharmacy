package com.project.pharmacy.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResetAccountRequest {
    private String email;
    private String code;
    private String newPassword;
}
