package com.project.pharmacy.repository;

import com.project.pharmacy.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CategoryRepository extends JpaRepository<Category, Integer> {

    List<Category> findByField(int field);
    @Query(value = "SELECT c FROM Category c WHERE c.fieldOfCategory.slug=:slugField")
    List<Category> findCategoriesBySlugField(@Param("slugField") String slugField);


}
