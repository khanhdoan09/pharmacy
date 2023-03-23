package com.project.pharmacy.service;

import com.project.pharmacy.entity.Medicine;
import com.project.pharmacy.exception.CustomException;

import com.project.pharmacy.repository.MedicineRepostory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


import java.sql.Array;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepostory medicineRepostory;

    public Medicine findById(int id) throws CustomException {
        Optional<Medicine> medicine = medicineRepostory.findById(id);
        if (medicine.isPresent()) {
            return medicine.get();
        } else {
            throw new CustomException(HttpStatus.NOT_FOUND, "medicine id was not found");
        }
    }

    public Page<Medicine> findByNameOrBrand(String keyword, int page, int pageSize) throws CustomException {
        Page<Medicine> medicines = medicineRepostory.findByNameOrBrand(keyword, PageRequest.of(page, pageSize));
        List<Medicine> listM = medicines.getContent();
        if (listM.size() == 0 ) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't find medicine with keyword " + keyword);
        }
        return medicines;
    }


}
