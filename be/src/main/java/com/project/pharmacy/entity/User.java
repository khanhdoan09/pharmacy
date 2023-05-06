package com.project.pharmacy.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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
    private int rewardPoint;

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
        this.rewardPoint = 0;
    }

    ////////////
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonManagedReference
    private Set<Orders> orders;


}