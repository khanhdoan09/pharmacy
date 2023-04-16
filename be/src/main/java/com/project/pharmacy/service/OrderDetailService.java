package com.project.pharmacy.service;

import com.project.pharmacy.entity.OrderDetail;
import com.project.pharmacy.entity.Orders;
import com.project.pharmacy.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderDetailService {
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public boolean saveNewOrderDetail(OrderDetail orderDetail) {
        orderDetailRepository.save(orderDetail);
        return true;
    }
}
