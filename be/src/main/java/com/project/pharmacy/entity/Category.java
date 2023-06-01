package com.project.pharmacy.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "category")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "field")
    private int field;
    @Column(name = "category")
    private String category;
    private String image;
    private String slug;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<CategoryDetail> categoryDetails;

    @ManyToOne
    @JoinColumn(name = "field", insertable = false, updatable = false)
    @JsonManagedReference
    private Field fieldOfCategory;
}
