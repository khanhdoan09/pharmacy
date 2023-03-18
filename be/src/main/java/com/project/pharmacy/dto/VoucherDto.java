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
    private int value;
    private String beginningDate;
    private String expirationDate;
}
