package com.project.pharmacy.repository;

import com.project.pharmacy.entity.Medicine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface MedicineRepository extends JpaRepository<Medicine, Integer> {
    Optional<Medicine> findById(int medicineId);

    @Query(value = "select m from Medicine m inner join Brand b on m.brand = b.id join CategoryDetail cd on m" +
            ".categoryDetailId = cd.id where m.name like " +
            "%:keyword% or b.name like %:keyword% or cd.name like %:keyword%")
    Page<Medicine> findMedicinesByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query(value = "SELECT m FROM Medicine m JOIN CategoryDetail cd on m.categoryDetailId = cd.id\n" +
            "WHERE cd.category.fieldOfCategory.id = :fieldId ORDER BY m.saleNumber DESC")
    List<Medicine> bestSellerByFieldId(@Param("fieldId") int fieldId);

    @Query(value = "SELECT m FROM Medicine m WHERE m.categoryDetail.id = :categoryDetailId")
    List<Medicine> findMedicineByCategoryDetailId(@Param("categoryDetailId") int categoryDetailId);

    @Query(value = "SELECT m FROM Medicine m JOIN CategoryDetail cd on m.categoryDetailId = cd.id\n" +
            "WHERE cd.category.fieldOfCategory.slug = :slugField and cd.category.slug = :slugCategory")
    List<Medicine> findBySlugFieldAndSlugCategory(String slugField, String slugCategory);

    @Query(value = "SELECT m FROM Medicine m JOIN CategoryDetail cd on m.categoryDetailId = cd.id\n" +
            "WHERE cd.category.fieldOfCategory.slug = :slugField and cd.category.slug = :slugCategory")
    Page<Medicine> findBySlugFieldAndSlugCategoryWithPage(String slugField, String slugCategory, Pageable pageable);


}
