package com.project.pharmacy.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "rate")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "medicine_id")
    private int medicineId;
    @Column(name = "user_id")
    private int userId;
    private int star;
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "medicine_id", insertable = false, updatable = false)
    @JsonBackReference
    private Medicine medicine;
}
