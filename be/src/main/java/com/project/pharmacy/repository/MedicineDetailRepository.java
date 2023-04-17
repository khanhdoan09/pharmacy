package com.project.pharmacy.repository;

import com.project.pharmacy.entity.MedicineDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MedicineDetailRepository extends JpaRepository<MedicineDetail, Integer> {
    @Query("select md from MedicineDetail md where md.medicineId = :medicineId")
    MedicineDetail findMedicineDetailByMedicineId(@Param("medicineId") int medicineId);
}
