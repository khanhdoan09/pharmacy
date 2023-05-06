package com.project.pharmacy.service;

import com.project.pharmacy.entity.Medicine;
import com.project.pharmacy.entity.Orders;
import com.project.pharmacy.entity.Rate;
import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.repository.MedicineRepostory;
import com.project.pharmacy.repository.OrderRepository;
import com.project.pharmacy.repository.RateRepository;
import com.project.pharmacy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RateService {
    @Autowired
    RateRepository rateRepository;

    public List<Rate> findRateByMedicineId(int medicineId) throws CustomException {
        List<Rate> rates =
                rateRepository.findAll().stream().filter(rate -> rate.getMedicine().getId() == medicineId).collect(Collectors.toList());
        if (rates.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't find rate by medicineId = " + medicineId);
        }
        return rates;
    }

    public void saveRate(Rate rate) {
        rateRepository.save(rate);
    }

}