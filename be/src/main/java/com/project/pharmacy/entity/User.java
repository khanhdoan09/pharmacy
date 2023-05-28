package com.project.pharmacy.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @NotEmpty
    @Size(min = 4, max = 16)
    private String name;
    @Email
    private String email;
    @NotNull
    @NotEmpty
    private String password;
    private String phoneNumber;
    private String createDate;
    private String avatar;
    private String accountType;
    private String role;
    private int rewardPoint;
    private boolean active;
    private String codeActiveValue;
    private String codeActiveTime;

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
        this.active = false;
        this.codeActiveValue = null;
        this.codeActiveTime = null;
    }

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonManagedReference
    @JsonIgnore
    private Set<Orders> orders;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
//    @JsonManagedReference
    @JsonIgnore
    private List<Comment> comments;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnore
    private List<Likes> likes;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
//    @JsonManagedReference
    @JsonIgnore
    private List<Rate> rateList;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnore
    private List<Saved> savedList;
}