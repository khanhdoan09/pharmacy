package com.project.pharmacy.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
//    @NotNull(message = "email cannot be null")
//    @NotEmpty(message = "email cannot be empty")
//    @NotBlank(message = "email cannot be blank")
    private String email;
//    @NotNull(message = "password cannot be null")
//    @NotEmpty(message = "password cannot be empty")
//    @NotBlank(message = "password cannot be blank")
    private String password;
    private String phoneNumber;
    private String createDate;
    private String avatar;
//    @NotNull(message = "role cannot be null")
//    @NotEmpty(message = "role cannot be empty")
//    @NotBlank(message = "role cannot be blank")
    private String role;
}