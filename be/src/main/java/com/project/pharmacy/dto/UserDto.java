package com.project.pharmacy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    // do không trả về password field cho client nên cần phải tạo UserDto
    private int id;
    private String email;
    private String phoneNumber;
    private String createDate;
    private String avatar;
    private String role;
    private String accessToken;
}
