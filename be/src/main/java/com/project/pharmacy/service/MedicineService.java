package com.project.pharmacy.service;

import com.project.pharmacy.entity.Medicine;
import com.project.pharmacy.entity.MedicineDetail;
import com.project.pharmacy.entity.MedicineIngredient;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.repository.MedicineDetailRepository;
import com.project.pharmacy.repository.MedicineIngredientRepository;
import com.project.pharmacy.repository.MedicineRepository;
import com.project.pharmacy.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MedicineService {

    @Autowired
    MedicineRepository medicineRepository;
    @Autowired
    MedicineIngredientRepository medicineIngredientRepository;
    @Autowired
    MedicineDetailRepository medicineDetailRepository;
    @Autowired
    OrderDetailRepository orderDetailRepository;

    public List<Medicine> getMedicines() {
        return medicineRepository.findAll();
    }

    @Cacheable("productCache")
    public Medicine findById(int id) throws CustomException {
        Optional<Medicine> medicine = medicineRepository.findById(id);
        if (medicine.isPresent()) {
            return medicine.get();
        } else {
            throw new CustomException(HttpStatus.NOT_FOUND, "medicine id was not found");
        }
    }

    public Page<Medicine> findMedicinesByKeyword(String keyword, int page, int pageSize) throws CustomException {
        Page<Medicine> medicines = medicineRepository.findMedicinesByKeyword(keyword, PageRequest.of(page, pageSize));
        List<Medicine> listM = medicines.getContent();
        if (listM.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't find medicine with keyword " + keyword);
        }
        return medicines;
    }

    public Page<Medicine> findBySlugFieldAndSlugCategoryWithPage(String slugField,
                                                                 String slugCategory,
                                                                 int page,
                                                                 int pageSize) throws CustomException {
        Page<Medicine> medicines = medicineRepository.findBySlugFieldAndSlugCategoryWithPage(
                slugField,
                slugCategory,
                PageRequest.of(page, pageSize));
        if (medicines.getContent().size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't findBySlugFieldAndSlugCategoryWithPage");
        }
        return medicines;
    }

    public List<Medicine> bestSellerBySlugField(int fieldId) throws CustomException {
        List<Medicine> medicines = medicineRepository.bestSellerByFieldId(fieldId);
        if (medicines.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't find medicine with field id is " + fieldId);
        }
        return medicines;
    }




    public List<Medicine> findMedicineByCategoryDetailId(int categoryDetailId) throws CustomException {
        List<Medicine> medicines = medicineRepository.findMedicineByCategoryDetailId(categoryDetailId);
        if (medicines.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't findMedicineByCategoryDetailId with " +
                    "category detail id is " + categoryDetailId);
        }
        return medicines;
    }

    public void updateTotalQuantityAndSaleQuantity(int medicineId, int numberToUpdate) {
        Medicine medicine = this.medicineRepository.findById(medicineId).get();
        medicine.setTotalNumber(medicine.getTotalNumber() - numberToUpdate);
        medicine.setSaleNumber(medicine.getSaleNumber() + numberToUpdate);
        this.medicineRepository.save(medicine);
    }

    public List<MedicineIngredient> findMedicineIngredientByMedicineId(int medicineId) throws CustomException {
        List<MedicineIngredient> medicineIngredients =
                medicineIngredientRepository.findMedicineIngredientByMedicineId(medicineId);
        if (medicineIngredients == null) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't findIngredientByMedicineId = " + medicineId);
        } else {
            return medicineIngredients;
        }
    }


    public MedicineDetail findMedicineDetailByMedicineId(int medicineId) throws CustomException {
        MedicineDetail medicineDetail = medicineDetailRepository.findMedicineDetailByMedicineId(medicineId);
        if (medicineDetail == null) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't findMedicineDetailByMedicineId = " + medicineId);
        } else {
            return medicineDetail;
        }
    }

    public List<Medicine> findBestMedicinesInHistory() {
        List<Integer> medicineIdList = orderDetailRepository.findBestMedicinesInHistory();
        List<Medicine> medicines = new ArrayList<Medicine>();
        for (int i = 0; i < medicineIdList.size() && i < 5; i++) {
            try {
                Medicine medicine = medicineRepository.findById(medicineIdList.get(i)).get();
                medicines.add(medicine);
            } catch (Exception e) {
                continue;
            }
        }
        return medicines;
    }

    public List<Medicine> findMedicinesByObject(String object) {
        List<Medicine> medicines = medicineDetailRepository.findMedicinesByObject(object);
        return medicines;
    }

    public List<Medicine> findMedicinesByCategoryDetailId(int categoryDetailId) {
        List<Medicine> medicines = medicineRepository.findMedicineByCategoryDetailId(categoryDetailId);
        System.out.println(medicines.size());
        return medicines;
    }

    public List<Medicine> findBySlugFieldAndSlugCategory(String slugField, String slugCategory) throws CustomException {
        List<Medicine> medicines = medicineRepository.findBySlugFieldAndSlugCategory(
                slugField,
                slugCategory);
        if (medicines.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't findBySlugFieldAndSlugCategoryOrderByPriceASC");
        }
        return medicines;
    }


}