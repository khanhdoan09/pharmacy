package com.project.pharmacy.repository;

import com.project.pharmacy.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineRepostory extends JpaRepository<Medicine, Integer> {
}
