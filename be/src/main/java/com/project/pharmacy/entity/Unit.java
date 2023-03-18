package com.project.pharmacy.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Unit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private int level;
    private int quantity;
    private int medicineId;
    private int price;
}
