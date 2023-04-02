package com.project.pharmacy.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "field")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Field {
    @Id
    @Column(unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String slug;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<Category> categories;
}
