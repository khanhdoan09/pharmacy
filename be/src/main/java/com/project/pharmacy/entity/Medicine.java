package com.project.pharmacy.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import java.util.List;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "medicine")
@Data

@AllArgsConstructor
@NoArgsConstructor
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String producer;
    private String brand;
    private String country;
    private String category;
    private String itemForm;
    private String categoryDetailId;
    private String specification;
    private String price;
    private String discount;
    private String slug;
    private int active;
    private int totalNumber;
    private int saleNumber;
    private String avatar;

    @OneToOne
    @JoinColumn(name = "brand", insertable = false, updatable = false)
    private Brand brandDetail;

    @OneToOne
    @JoinColumn(name = "producer", insertable = false, updatable = false)
    private Producer producerDetail;

    @OneToOne
    @JoinColumn(name = "categoryDetailId", insertable = false, updatable = false)
    private CategoryDetail categoryDetail;

    @OneToMany(mappedBy = "medicine", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<MedicineIngredient> ingredient;

    @OneToMany(mappedBy = "medicine", cascade = CascadeType.ALL)
    private List<Unit> priceWithUnit;


    @OneToMany(mappedBy = "medicine")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonBackReference
    private Set<OrderDetail> medicine;

    @OneToMany(mappedBy = "medicine",cascade =  CascadeType.ALL)
    @JsonManagedReference
    private List<Comment> comments;

    @OneToMany(mappedBy = "medicine",cascade =  CascadeType.ALL)
    @JsonManagedReference
    private List<Rate> rates;

    @OneToMany(mappedBy = "medicine",cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Saved> savedList;


}