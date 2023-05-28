package com.project.pharmacy.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @Column(name = "medicine_id")
    private int medicineId;
    private int price;

    @ManyToOne
    @JoinColumn(name = "medicine_id", insertable = false, updatable = false)
    @JsonBackReference
    private Medicine medicine;
}
