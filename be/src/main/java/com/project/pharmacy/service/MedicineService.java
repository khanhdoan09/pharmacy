package com.project.pharmacy.service;

import com.project.pharmacy.entity.Cart;
import com.project.pharmacy.entity.Medicine;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    public Medicine findById(int id) throws CustomException {
        Optional<Medicine> medicine = medicineRepository.findById(id);
        if (medicine.isPresent()) {
            return medicine.get();
        } else {
            throw new CustomException(HttpStatus.NOT_FOUND, "medicine id was not found");
        }
    }
}
