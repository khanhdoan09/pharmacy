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

    public Page<Medicine> findMedicinesByKeyword(String keyword, int page, int pageSize) throws CustomException {
        Page<Medicine> medicines = medicineRepostory.findMedicinesByKeyword(keyword, PageRequest.of(page, pageSize));
        List<Medicine> listM = medicines.getContent();
        if (listM.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't find medicine with keyword " + keyword);
        }
        return medicines;
    }

    public List<Medicine> bestSellerBySlugField(int fieldId) throws CustomException {
        List<Medicine> medicines = medicineRepostory.bestSellerByFieldId(fieldId);
        if (medicines.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't find medicine with field id is " + fieldId);
        }
        return medicines;
    }

    public List<Medicine> bestSellerByCategoryId(int categoryId) throws CustomException {
        List<Medicine> medicines = medicineRepostory.bestSellerByCategoryId(categoryId);
        if (medicines.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND,
                                      "Can't find bestSellerByCategoryId with category id is " + categoryId);
        }
        return medicines;
    }

    public List<Medicine> findMedicineByFieldIdOrderByExpensivePrice(int fieldId) throws CustomException {
        List<Medicine> medicines = medicineRepostory.findMedicineByFieldIdOrderByExpensivePrice(fieldId);
        if (medicines.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't findMedicineByFieldIdOrderByExpensivePrice with " +
                    "field id is " + fieldId);
        }
        return medicines;
    }

    public List<Medicine> findMedicineByFieldIdOrderByCheapPrice(int fieldId) throws CustomException {
        List<Medicine> medicines = medicineRepostory.findMedicineByFieldIdOrderByCheapPrice(fieldId);
        if (medicines.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't findMedicineByFieldIdOrderByCheapPrice with field " +
                    "id is " + fieldId);
        }
        return medicines;
    }

    public List<Medicine> findMedicineByFieldIdOrderByNewRelease(int fieldId) throws CustomException {
        List<Medicine> medicines = medicineRepostory.findMedicineByFieldIdOrderByNewRelease(fieldId);
        if (medicines.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't findMedicineByFieldIdOrderByNewRelease with field " +
                    "id is " + fieldId);
        }
        return medicines;
    }

    public List<Medicine> findMedicineByCategoryIdOrderByExpensivePrice(int categoryId) throws CustomException {
        List<Medicine> medicines = medicineRepostory.findMedicineByCategoryIdOrderByExpensivePrice(categoryId);
        if (medicines.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't findMedicineByCategoryIdOrderByExpensivePrice with " +
                    "category id is " + categoryId);
        }
        return medicines;
    }
    public List<Medicine> findMedicineByCategoryIdOrderByCheapPrice(int categoryId) throws CustomException {
        List<Medicine> medicines = medicineRepostory.findMedicineByCategoryIdOrderByCheapPrice(categoryId);
        if (medicines.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't findMedicineByCategoryIdOrderByCheapPrice with " +
                    "category id is " + categoryId);
        }
        return medicines;
    }
    public List<Medicine> findMedicineByCategoryIdOrderByNewRelease(int categoryId) throws CustomException {
        List<Medicine> medicines = medicineRepostory.findMedicineByCategoryIdOrderByNewRelease(categoryId);
        if (medicines.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't findMedicineByCategoryIdOrderByNewRelease with " +
                    "category id is " + categoryId);
        }
        return medicines;
    }
    public List<Medicine> findMedicineByCategoryDetailId(int categoryDetailId) throws CustomException {
        List<Medicine> medicines = medicineRepostory.findMedicineByCategoryDetailId(categoryDetailId);
        if (medicines.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't findMedicineByCategoryDetailId with " +
                    "category detail id is " + categoryDetailId);
        }
        return medicines;
    }
}