package com.project.pharmacy.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "medicine_detail")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MedicineDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int medicineId;
    private int prescription;
    private String age;
    private String createDate;
    private int viewNumber;
    private int rateNumber;
    private int commentNumber;
    private String storage;
    private String usage;
    private String benefit;
    private String dosage;
    private String handleSideEffect;
    private String box;
    private String blisterPack;
    private String note;
    @OneToOne
    @JoinColumn(name = "medicineId", insertable = false, updatable = false)
    private Medicine medicine;

}
