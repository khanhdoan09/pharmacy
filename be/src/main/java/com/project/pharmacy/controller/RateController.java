package com.project.pharmacy.controller;

import com.project.pharmacy.entity.Medicine;
import com.project.pharmacy.entity.Rate;
import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.request.RateRequest;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.service.MedicineService;
import com.project.pharmacy.service.RateService;
import com.project.pharmacy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class RateController {
    @Autowired
    RateService rateService;
    @Autowired
    UserService userService;

    @Autowired
    MedicineService medicineService;


    @GetMapping("/findRateByMedicineId/{medicineId}")
    public ResponseHandler findRateByMedicineId(@PathVariable("medicineId") int medicineId) throws CustomException {
        List<Rate> rates = rateService.findRateByMedicineId(medicineId);
        ResponseHandler responseHandler = new ResponseHandler("FindRateByMedicineId successfully",
                                                              HttpStatus.OK.value(), rates);
        return responseHandler;
    }

    @PostMapping("/saveRate")
    public ResponseHandler saveRate(@RequestBody RateRequest rateRequest) throws CustomException {
        User user = userService.findById(rateRequest.getUserId());
        Medicine medicine = medicineService.findById(rateRequest.getMedicineId());

        Rate rate = new Rate();
        rate.setUser(user);
        rate.setMedicine(medicine);
        rate.setStar(rateRequest.getStar());
        rate.setContent(rateRequest.getContent());

        rateService.saveRate(rate);

        ResponseHandler responseHandler = new ResponseHandler("Save rate successfully", HttpStatus.OK.value(), null);
        return responseHandler;
    }
}
