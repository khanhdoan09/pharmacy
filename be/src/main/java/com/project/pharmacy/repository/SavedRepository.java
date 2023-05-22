package com.project.pharmacy.repository;

import com.project.pharmacy.entity.Saved;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SavedRepository extends JpaRepository<Saved, Long> {
    @Query(value = "select s from Saved s where s.user.id = :userId and s.medicine.id = :medicineId")
    Saved findByUserIdAndMedicineId(int userId, int medicineId);
}
