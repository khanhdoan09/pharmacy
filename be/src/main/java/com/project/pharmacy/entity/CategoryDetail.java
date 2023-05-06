package com.project.pharmacy.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "category_detail")
@Data
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
    private int categoryId;
    private String slug;


}
