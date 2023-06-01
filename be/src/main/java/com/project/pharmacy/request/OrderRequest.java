package com.project.pharmacy.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    @Getter
    @Setter
    public static class Order {
        private int totalPayment;
        private String address;
        private String phoneNumber;
        private String addressee;
        private String message;
        private String paymentMethod;
        private int id;
        private String email;
    }

    @Getter
    @Setter
    public static class OrderDetail {
        private String unit;
        private int quantity;
        private int price;
        private int medicineId;
        private int cartId;
        private int unitId;
    }

    public Order order;
    private List<OrderDetail> list;

}
