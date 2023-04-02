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
    Page<Medicine> findMedicinesByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query(value = "SELECT m FROM Medicine m JOIN CategoryDetail cd on m.categoryDetailId = cd.id\n" +
            "JOIN Category c ON cd.categoryId = c.id\n" +
            "JOIN Field f ON c.field = f.id\n" +
            "WHERE f.id = :fieldId ORDER BY m.saleNumber DESC")
    List<Medicine> bestSellerByFieldId(@Param("fieldId") int fieldId);

    @Query(value = "SELECT m FROM Medicine m JOIN CategoryDetail cd on m.categoryDetailId = cd.id\n" +
            "JOIN Category c ON cd.categoryId = c.id\n" +
            "WHERE c.id = :categoryId ORDER BY m.saleNumber DESC")
    List<Medicine> bestSellerByCategoryId(@Param("categoryId") int categoryId);

    @Query(value = "SELECT m FROM Medicine m JOIN CategoryDetail cd on m.categoryDetailId = cd.id\n" +
            "JOIN Category c ON cd.categoryId = c.id\n" +
            "JOIN Field f ON c.field = f.id\n" +
            "WHERE f.id = :fieldId order by ABS(m.price) desc")
    List<Medicine> findMedicineByFieldIdOrderByExpensivePrice(@Param("fieldId") int fieldId);

    @Query(value = "SELECT m FROM Medicine m JOIN CategoryDetail cd on m.categoryDetailId = cd.id\n" +
            "JOIN Category c ON cd.categoryId = c.id\n" +
            "JOIN Field f ON c.field = f.id\n" +
            "WHERE f.id = :fieldId order by ABS(m.price) asc")
    List<Medicine> findMedicineByFieldIdOrderByCheapPrice(@Param("fieldId") int fieldId);

    @Query(value = "SELECT m FROM Medicine m JOIN CategoryDetail cd on m.categoryDetailId = cd.id\n" +
            "JOIN Category c ON cd.categoryId = c.id\n" +
            "JOIN Field f ON c.field = f.id\n" +
            "WHERE f.id = :fieldId order by m.totalNumber desc")
    List<Medicine> findMedicineByFieldIdOrderByNewRelease(@Param("fieldId") int fieldId);
    @Query(value = "SELECT m FROM Medicine m JOIN CategoryDetail cd on m.categoryDetailId = cd.id\n" +
            "JOIN Category c ON cd.categoryId = c.id\n" +
            "WHERE c.id = :categoryId order by ABS(m.price) desc")
    List<Medicine> findMedicineByCategoryIdOrderByExpensivePrice(@Param("categoryId") int categoryId);
    @Query(value = "SELECT m FROM Medicine m JOIN CategoryDetail cd on m.categoryDetailId = cd.id\n" +
            "JOIN Category c ON cd.categoryId = c.id\n" +
            "WHERE c.id = :categoryId order by ABS(m.price) asc")
    List<Medicine> findMedicineByCategoryIdOrderByCheapPrice(@Param("categoryId") int categoryId);
    @Query(value = "SELECT m FROM Medicine m JOIN CategoryDetail cd on m.categoryDetailId = cd.id\n" +
            "JOIN Category c ON cd.categoryId = c.id\n" +
            "WHERE c.id = :categoryId order by m.totalNumber desc")
    List<Medicine> findMedicineByCategoryIdOrderByNewRelease(@Param("categoryId") int categoryId);
    @Query(value = "SELECT m FROM Medicine m JOIN CategoryDetail cd on m.categoryDetailId = cd.id\n" +
            "JOIN Category c ON cd.categoryId = c.id\n" +
            "WHERE cd.id = :categoryDetailId")
    List<Medicine> findMedicineByCategoryDetailId(@Param("categoryDetailId") int categoryDetailId);
}
