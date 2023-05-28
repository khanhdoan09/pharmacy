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
    private LocalDateTime created_date;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false,updatable = false)
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "medicine_id",insertable = false,updatable = false)
    @JsonBackReference
    private Medicine medicine;

}
