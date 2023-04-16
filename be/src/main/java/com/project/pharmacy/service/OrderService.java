package com.project.pharmacy.service;

import com.project.pharmacy.entity.Orders;
import com.project.pharmacy.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public int saveNewOrder(Orders order) {
        Orders newOrder = orderRepository.save(order);
        return newOrder.getId();
    }
}
