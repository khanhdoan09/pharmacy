package com.project.pharmacy.service;

import com.project.pharmacy.entity.CategoryDetail;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.repository.CategoryDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryDetailService {
    @Autowired
    CategoryDetailRepository categoryDetailRepository;

    public List<CategoryDetail> findCategoryDetailByCategoryId(int categoryId) throws CustomException {
        List<CategoryDetail> listCD = categoryDetailRepository.findCategoryDetailByCategoryId(categoryId);
        if (listCD.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't found categories with categoryId " + categoryId);
        }
        return listCD;
    }
    public List<CategoryDetail> findCategoryDetailBySlugCategory(String slugCategory) throws CustomException {
        List<CategoryDetail> listCD = categoryDetailRepository.findCategoryDetailBySlugCategory(slugCategory);
        if (listCD.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't found categories with slug category is" + slugCategory);
        }
        return listCD;
    }

}
