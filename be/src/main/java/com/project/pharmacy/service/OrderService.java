package com.project.pharmacy.service;

import com.project.pharmacy.entity.Orders;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public int saveNewOrder(Orders order) {
        Orders newOrder = orderRepository.save(order);
        return newOrder.getId();
    }

    public List<Orders> getOrderByEmail(String email) throws CustomException {
        List<Orders> orders =
                orderRepository.findAll().stream().filter(o -> o.getUser().getEmail().equals(email)).collect(Collectors.toList());
        if (orders.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "not found orders by user id");
        }
//        orders.forEach(o -> o.getOrderDetail().forEach(od -> od.setOrder(null)));
        return orders;
    }
}
