package com.project.pharmacy.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
//    private int userId;
    private int totalPayment;
    private String createDate;
    private String paymentMethod;
    private String address;
    private String message;
    private String addressee;
    private String phoneNumber;
    private String status;

    @OneToMany(mappedBy = "order", cascade = {CascadeType.PERSIST})
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonManagedReference
    private Collection<OrderDetail> orderDetail;
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonBackReference
    private User user;
}
