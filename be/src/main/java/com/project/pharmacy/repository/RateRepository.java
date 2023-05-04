package com.project.pharmacy.repository;

import com.project.pharmacy.entity.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RateRepository extends JpaRepository<Rate, Integer> {
    @Query(value = "select r.id, r.star, r.content from Rate r where r.medicine.id = :medicineId")
    public List<Rate> findRateByMedicineId(@Param("medicineId") int medicineId);
}
