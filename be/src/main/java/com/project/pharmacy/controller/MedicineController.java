package com.project.pharmacy.controller;

import com.project.pharmacy.entity.Medicine;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.service.MedicineService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class MedicineController {
    @Autowired
    private MedicineService medicineService;

    @Autowired
    private ModelMapper mapper;

    @GetMapping("/medicines")
    public ResponseHandler<List<Medicine>> getAllMedicine() {
        List<Medicine> listM = medicineService.getAllMedicine();

        ResponseHandler<List<Medicine>> responseHandler = new ResponseHandler<List<Medicine>>("ok", HttpStatus.OK.value(), listM);
        return responseHandler;
    }
}
