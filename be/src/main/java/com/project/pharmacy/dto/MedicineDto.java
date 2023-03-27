package com.project.pharmacy.dto;

import lombok.Data;

@Data
public class MedicineDto {
    private int id;
    private String name;
    private String producer;
    private String brand;
    private String country;
    private String category;
    private String categoryDetailId;
    private String specification;
    private String price;
    private String discount;
    private String slug;
    private int active;
}
