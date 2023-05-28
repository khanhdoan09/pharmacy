package com.project.pharmacy.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "category_detail")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CategoryDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String image;
    @Column(name="category_id")
    private int categoryId;
    private String slug;

    @ManyToOne
    @JoinColumn(name = "category_id", insertable = false, updatable = false)
    @JsonBackReference
    private Category category;
}

