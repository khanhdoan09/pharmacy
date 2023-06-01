package com.project.pharmacy.repository;

import com.project.pharmacy.entity.Medicine;
import com.project.pharmacy.entity.MedicineDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MedicineDetailRepository extends JpaRepository<MedicineDetail, Integer> {
    @Query("select md from MedicineDetail md where md.medicineId = :medicineId")
    MedicineDetail findMedicineDetailByMedicineId(@Param("medicineId") int medicineId);
    @Query("select md.medicine from MedicineDetail md where md.age = :object")
    List<Medicine> findMedicinesByObject(String object);
}
