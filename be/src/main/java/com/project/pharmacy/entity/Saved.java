package com.project.pharmacy.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "saved")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Saved {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "user_id")
    private int userId;
    @Column(name = "medicine_id")
    private int medicineId;
    private LocalDateTime created_date;

    public Saved(Long id, int userId, int medicineId, LocalDateTime created_date) {
        this.id = id;
        this.userId = userId;
        this.medicineId = medicineId;
        this.created_date = created_date;
    }

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "medicine_id", insertable = false, updatable = false)
    @JsonBackReference
    private Medicine medicine;

}
