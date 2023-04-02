package com.project.pharmacy.controller;

import com.project.pharmacy.entity.Category;
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
    private CategoryService categoryService;

    @Autowired
    private ModelMapper mapper;

    @GetMapping("/categories")
    public ResponseHandler<List<Category>> getAllFields() {
        List<Category> categories = categoryService.getCategories();
        ResponseHandler<List<Category>> responseHandler = new ResponseHandler<>(
                "Successfully categories", HttpStatus.OK.value(), categories
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
}
