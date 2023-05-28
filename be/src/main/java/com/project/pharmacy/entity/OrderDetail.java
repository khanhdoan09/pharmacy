package com.project.pharmacy.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;

@Entity(name = "order_detail")
@Table()
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
//    private int orderId;
//    private int medicineId;
    private int quantity;
    private int price;
    private String unit;


    @ManyToOne
    @JoinColumn(name = "order_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonBackReference
    private Orders order;

    @ManyToOne
    @JoinColumn(name = "medicine_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonManagedReference
    private Medicine medicine;
}
