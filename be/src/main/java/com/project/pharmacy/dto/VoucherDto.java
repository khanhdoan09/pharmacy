package com.project.pharmacy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherDto {
    private int id;
    private String name;
    private double discount;
    private String beginningDate;
    private String expirationDate;
}
