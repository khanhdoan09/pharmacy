package com.project.pharmacy.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @Column(name = "medicine_id")
    private int medicineId;
    private int ingredientId;
    private String content;

    @OneToOne
    @JoinColumn(name = "id")
    private Ingredient ingredient;

    @ManyToOne
    @JoinColumn(name = "medicine_id", insertable = false, updatable = false)
    @JsonBackReference
    private Medicine medicine;
}
