package com.project.pharmacy.controller;

import com.project.pharmacy.entity.Field;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.service.FieldService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class FieldController {
    @Autowired
    private FieldService fieldService;

    @Autowired
    private ModelMapper mapper;

    @GetMapping("/fields")
    public ResponseHandler<List<Field>> findFields() {
        List<Field> fields = fieldService.findFields();
        ResponseHandler<List<Field>> responseHandler = new ResponseHandler<>(
                "Successfully get all field", HttpStatus.OK.value(), fields
        );
        return responseHandler;
    }
}
