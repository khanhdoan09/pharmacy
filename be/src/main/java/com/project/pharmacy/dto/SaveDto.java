package com.project.pharmacy.dto;

import com.project.pharmacy.entity.Medicine;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SaveDto {
    private Long id;
    private Medicine medicine;
    private LocalDateTime createdDate;
}
