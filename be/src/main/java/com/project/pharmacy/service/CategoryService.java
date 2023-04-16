package com.project.pharmacy.service;

import com.project.pharmacy.entity.Category;
import com.project.pharmacy.entity.Field;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public List<Category> findByIdField(int field) throws CustomException {
        List<Category> categories = categoryRepository.findByField(field);
        if (categories.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't found categories with field is " + field);
        }
        return categories;
    }
    public List<Category> findCategoriesBySlugField(String slugField) throws CustomException {
        List<Category> categories = categoryRepository.findCategoriesBySlugField(slugField);
        if (categories.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't found categories with slug field is " + slugField);
        }else{
            return categories;
        }
    }
}