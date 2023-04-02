package com.project.pharmacy.controller;

import com.project.pharmacy.entity.CategoryDetail;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.service.CategoryDetailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class CategoryDetailController {

    @Autowired
    CategoryDetailService categoryDetailService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping("/categoryDetail/{categoryId}")
    public ResponseHandler<List<CategoryDetail>> getCategoryDetailByCategoryId(@PathVariable("categoryId") int categoryId) throws CustomException {
        List<CategoryDetail> listCD = categoryDetailService.findCategoryDetailByCategoryId(categoryId);
        ResponseHandler<List<CategoryDetail>> responseHandler = new ResponseHandler<>(
                "Successfully find category detail", HttpStatus.OK.value(), listCD
        );
        return responseHandler;
    }
    @GetMapping("/findCategoryDetailBySlugCategory/{slugCategory}")
    public ResponseHandler<List<CategoryDetail>> findCategoryDetailBySlugCategory(@PathVariable("slugCategory") String slugCategory) throws CustomException {
        List<CategoryDetail> listCD = categoryDetailService.findCategoryDetailBySlugCategory(slugCategory);
        ResponseHandler<List<CategoryDetail>> responseHandler = new ResponseHandler<>(
                "Successfully find category detail", HttpStatus.OK.value(), listCD
        );
        return responseHandler;
    }

}
