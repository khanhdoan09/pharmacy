package com.project.pharmacy.entity;


import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

    private String email;

    private String password;
    private String phoneNumber;
    private String createDate;
    private String avatar;
    private String accountType;
    private String role;


    // for save a new user
    public User(String name, String email, String password, String phoneNumber, String createDate, String accountType
            , String avatar, String role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.createDate = createDate;
        this.avatar = avatar;
        this.accountType = accountType;
        this.role = role;
    }
}