package com.project.pharmacy.repository;

import com.project.pharmacy.entity.MedicineIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MedicineIngredientRepository extends JpaRepository<MedicineIngredient,Integer> {

    @Query("select mi from MedicineIngredient mi where mi.medicineId = :medicineId")
    List<MedicineIngredient> findMedicineIngredientByMedicineId(@Param("medicineId") int medicineId);
}
