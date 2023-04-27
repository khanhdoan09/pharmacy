package com.project.pharmacy.service;

import com.project.pharmacy.entity.Unit;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnitService {

    @Autowired
    private UnitRepository unitRepository;

    public List<Unit> findAllUnitsInAMedicine(int medicineId) throws CustomException {
        if (medicineId < 1) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "parameter must be greater than 0");
        }
        List<Unit> units = unitRepository.findByMedicineId(medicineId);
        if (units.isEmpty()) {
            throw new CustomException(HttpStatus.NOT_FOUND, "no units of a medicine were found " + medicineId);
        }
        return units;
    }

    public int findALLQuantityByLevelUnit(int unitId, int medicineId) {
        return unitRepository.findALLQuantityByLevelUnit(unitId, medicineId);
    }

    public Unit findUnitById(int unitId) {
        return unitRepository.findById(unitId).get();
    }
}
