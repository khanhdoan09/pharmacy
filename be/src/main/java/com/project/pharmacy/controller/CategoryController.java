package com.project.pharmacy.controller;

import com.project.pharmacy.entity.Category;
import com.project.pharmacy.entity.CategoryDetail;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.service.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @Autowired
    ModelMapper mapper;

    @GetMapping("/getCategoryDetails")
    public ResponseHandler getCategoryDetails() {
        ResponseHandler responseHandler = new ResponseHandler(
                "Successfully getCategoryDetails", HttpStatus.OK.value(), categoryService.getCategoryDetails()
        );
        return responseHandler;
    }
    @GetMapping("/categories")
    public ResponseHandler getCategories() {
        ResponseHandler responseHandler = new ResponseHandler(
                "Successfully categories", HttpStatus.OK.value(), categoryService.getCategories()
        );
        return responseHandler;
    }

    @GetMapping("/categories/{fieldId}")
    public ResponseHandler<List<Category>> findCategoriesByFieldId(@PathVariable("fieldId") int fieldId) throws CustomException {
        List<Category> categories = categoryService.findByIdField(fieldId);
        ResponseHandler<List<Category>> responseHandler = new ResponseHandler<>(
                "Successfully find category by FieldId", HttpStatus.OK.value(), categories
        );
        return responseHandler;
    }

    @GetMapping("/findCategoriesBySlugField/{slugField}")
    public ResponseHandler<List<Category>> findCategoriesBySlugField(@PathVariable("slugField") String slugField) throws CustomException {
        List<Category> categories = categoryService.findCategoriesBySlugField(slugField);
        ResponseHandler<List<Category>> responseHandler = new ResponseHandler<>(
                "Successfully find category by slug field", HttpStatus.OK.value(), categories
        );
        return responseHandler;
    }

    @GetMapping("/categoryDetail/{categoryId}")
    public ResponseHandler<List<CategoryDetail>> getCategoryDetailByCategoryId(@PathVariable("categoryId") int categoryId) throws CustomException {
        List<CategoryDetail> listCD = categoryService.findCategoryDetailByCategoryId(categoryId);
        ResponseHandler<List<CategoryDetail>> responseHandler = new ResponseHandler<>(
                "Successfully find category detail", HttpStatus.OK.value(), listCD
        );
        return responseHandler;
    }

    @GetMapping("/findCategoryDetailBySlugCategory/{slugCategory}")
    public ResponseHandler<List<CategoryDetail>> findCategoryDetailBySlugCategory(@PathVariable("slugCategory") String slugCategory) throws CustomException {
        List<CategoryDetail> listCD = categoryService.findCategoryDetailBySlugCategory(slugCategory);
        ResponseHandler<List<CategoryDetail>> responseHandler = new ResponseHandler<>(
                "Successfully find category detail", HttpStatus.OK.value(), listCD
        );
        return responseHandler;
    }
}
