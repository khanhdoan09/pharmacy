package com.project.pharmacy.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "medicine")
@Data

@AllArgsConstructor
@NoArgsConstructor
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String producer;
    private String brand;
    private String country;
    private String category;
    private String itemForm;
    private String categoryDetailId;
    private String specification;
    private String price;
    private String discount;
    private String slug;
    private int active;
    private int totalNumber;
    private int saleNumber;
    private String avatar;
}
