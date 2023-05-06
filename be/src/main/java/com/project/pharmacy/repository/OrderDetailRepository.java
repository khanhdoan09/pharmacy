package com.project.pharmacy.repository;

import com.project.pharmacy.entity.Medicine;
import com.project.pharmacy.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.*;


public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    @Query(value = "select medicine.id from order_detail group by medicine.id order by count(medicine.id) desc")
    List<Integer> findBestMedicinesInHistory();
}
