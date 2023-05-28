package com.project.pharmacy.repository;

import com.project.pharmacy.entity.CategoryDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryDetailRepository extends JpaRepository<CategoryDetail, Integer> {

    List<CategoryDetail> findCategoryDetailByCategoryId(int categoryId);

    @Query(value="select cd from CategoryDetail cd where cd.category.slug = :slugCategory")
    List<CategoryDetail> findCategoryDetailBySlugCategory(@Param("slugCategory")String slugCategory);


}
