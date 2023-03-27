package com.project.pharmacy.repository;

import com.project.pharmacy.entity.Medicine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface MedicineRepostory extends JpaRepository<Medicine, Integer> {
    Optional<Medicine> findById(int medicineId);
    @Query(value = "select m from Medicine m inner join Brand b on m.brand = b.id join CategoryDetail cd on m" +
            ".categoryDetailId = cd.id where m.name like " +
            "%:keyword% or b.name like %:keyword% or cd.name like %:keyword%")
    Page<Medicine> findByNameOrBrand(@Param("keyword") String keyword, Pageable pageable);


}
