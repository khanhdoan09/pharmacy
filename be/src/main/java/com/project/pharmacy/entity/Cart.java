package com.project.pharmacy.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
//    private int userId;
    @OneToOne
    @JoinColumn(name = "medicine_id")
    private Medicine medicine;
    private int quantity;
    private String createDate;
    private String updateDate;
    @OneToOne
    @JoinColumn(name = "unit_id")
    private Unit unit;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Cart(int userId, Medicine medicine, int quantity, String createDate, String updateDate, int unitId) {
//        this.userId = userId;
        this.medicine = medicine;
        this.quantity = quantity;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.unit = null;
    }

    // for add new
    public Cart(User user, Medicine medicine, int quantity, String createDate, String updateDate, Unit unit) {
        this.user = user;
        this.medicine = medicine;
        this.quantity = quantity;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.unit = unit;
    }
}
