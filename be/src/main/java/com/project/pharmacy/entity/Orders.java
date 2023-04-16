package com.project.pharmacy.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int userId;
    private int totalPayment;
    private String createDate;
    private String paymentMethod;
    private String address;
    private String message;
    private String addressee;
    private String phoneNumber;
}
