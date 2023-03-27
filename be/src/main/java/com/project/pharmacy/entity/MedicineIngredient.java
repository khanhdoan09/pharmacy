package com.project.pharmacy.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "medicine_ingredient")
@Data

@AllArgsConstructor
@NoArgsConstructor
public class MedicineIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int medicineId;
    private int ingredientId;
    private String content;

}
