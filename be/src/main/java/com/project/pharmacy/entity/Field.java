package com.project.pharmacy.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "field")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Field {
    @Id
    @Column(unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String slug;

    @OneToMany(mappedBy = "fieldOfCategory", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Category> categories;
}
