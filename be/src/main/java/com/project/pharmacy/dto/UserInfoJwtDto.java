package com.project.pharmacy.dto;

import com.project.pharmacy.entity.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UserInfoJwtDto {
    private String email;
    private String name;
    private String avatar;
    private String jwt;
    private String role;

    public UserInfoJwtDto(User user) {
        this.email = user.getEmail();
        this.name = user.getName();
        this.avatar = user.getAvatar();
        this.role = user.getRole();
    }
}
