package com.project.pharmacy.controller;

import com.project.pharmacy.entity.Medicine;
import com.project.pharmacy.entity.MedicineDetail;
import com.project.pharmacy.entity.MedicineIngredient;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.service.MedicineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class MedicineController {
    @Autowired
    private MedicineService medicineService;

    @Autowired
    private ModelMapper mapper;




    @GetMapping("/search/{keyword}/{page}/{pageSize}")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully search medicine"),
            @ApiResponse(responseCode = "404", description = "Can't find medicine with keyword", content =
            @Content(schema = @Schema(implementation = ResponseHandler.class)))
    })
    public ResponseHandler<Page<Medicine>> findMedicinesByKeyword(@PathVariable("keyword") String keyword,
                                                                  @PathVariable("page") int page,
                                                                  @PathVariable("pageSize") int pageSize) throws CustomException {

        Page<Medicine> medicines = medicineService.findMedicinesByKeyword(keyword, page, pageSize);

        ResponseHandler<Page<Medicine>> responseHandler = new ResponseHandler<Page<Medicine>>(
                "Successfully search medicine",
                HttpStatus.OK.value(),
                medicines);
        return responseHandler;
    }

    @GetMapping("/bestSellerByFieldId/{fieldId}")
    public ResponseHandler<List<Medicine>> bestSellerBySlugField(@PathVariable("fieldId") int fieldId) throws CustomException {

        List<Medicine> medicines = medicineService.bestSellerBySlugField(fieldId);

        ResponseHandler<List<Medicine>> responseHandler = new ResponseHandler<List<Medicine>>(
                "Successfully best seller by field id",
                HttpStatus.OK.value(),
                medicines);
        return responseHandler;
    }

    @GetMapping("/bestSellerByCategoryId/{categoryId}")
    public ResponseHandler<List<Medicine>> bestSellerByCategoryId(@PathVariable("categoryId") int categoryId) throws CustomException {

        List<Medicine> medicines = medicineService.bestSellerByCategoryId(categoryId);

        ResponseHandler<List<Medicine>> responseHandler = new ResponseHandler<List<Medicine>>(
                "Successfully bestSellerByCategoryId",
                HttpStatus.OK.value(),
                medicines);
        return responseHandler;
    }

    @GetMapping("/findMedicineByFieldIdOrderByExpensivePrice/{fieldId}")
    public ResponseHandler<List<Medicine>> findMedicineByFieldIdOrderByExpensivePrice(@PathVariable("fieldId") int fieldId
                                                                                     ) throws CustomException {

        List<Medicine> medicines = medicineService.findMedicineByFieldIdOrderByExpensivePrice(fieldId);

        ResponseHandler<List<Medicine>> responseHandler = new ResponseHandler<List<Medicine>>(
                "Successfully findMedicineByFieldIdOrderByExpensivePrice",
                HttpStatus.OK.value(),
                medicines);
        return responseHandler;
    }

    @GetMapping("/findMedicineByFieldIdOrderByCheapPrice/{fieldId}")
    public ResponseHandler<List<Medicine>> findMedicineByFieldIdOrderByCheapPrice(@PathVariable("fieldId") int fieldId
                                                                                 ) throws CustomException {

        List<Medicine> medicines = medicineService.findMedicineByFieldIdOrderByCheapPrice(fieldId);

        ResponseHandler<List<Medicine>>responseHandler = new ResponseHandler<List<Medicine>>(
                "Successfully findMedicineByFieldIdOrderByCheapPrice",
                HttpStatus.OK.value(),
                medicines);
        return responseHandler;
    }

    @GetMapping("/findMedicineByFieldIdOrderByNewRelease/{fieldId}")
    public ResponseHandler<List<Medicine>> findMedicineByFieldIdOrderByNewRelease(@PathVariable("fieldId") int fieldId) throws CustomException {

        List<Medicine> medicines = medicineService.findMedicineByFieldIdOrderByNewRelease(fieldId);

        ResponseHandler<List<Medicine>> responseHandler = new ResponseHandler<List<Medicine>>(
                "Successfully findMedicineByFieldIdOrderByNewRelease",
                HttpStatus.OK.value(),
                medicines);
        return responseHandler;
    }
    @GetMapping("/findMedicineByCategoryIdOrderByExpensivePrice/{categoryId}")
    public ResponseHandler<List<Medicine>> findMedicineByCategoryIdOrderByExpensivePrice(@PathVariable("categoryId") int categoryId
                                                                                     ) throws CustomException {

        List<Medicine> medicines = medicineService.findMedicineByCategoryIdOrderByExpensivePrice(categoryId);

        ResponseHandler<List<Medicine>> responseHandler = new ResponseHandler<List<Medicine>>(
                "Successfully findMedicineByCategoryIdOrderByExpensivePrice",
                HttpStatus.OK.value(),
                medicines);
        return responseHandler;
    }

    @GetMapping("/findMedicineByCategoryIdOrderByCheapPrice/{categoryId}")
    public ResponseHandler<List<Medicine>> findMedicineByCategoryIdOrderByCheapPrice(@PathVariable("categoryId") int categoryId
                                                                                        ) throws CustomException {

        List<Medicine> medicines = medicineService.findMedicineByCategoryIdOrderByCheapPrice(categoryId);

        ResponseHandler<List<Medicine>> responseHandler = new ResponseHandler<List<Medicine>>(
                "Successfully findMedicineByCategoryIdOrderByCheapPrice",
                HttpStatus.OK.value(),
                medicines);
        return responseHandler;
    }
    @GetMapping("/findMedicineByCategoryIdOrderByNewRelease/{categoryId}")
    public ResponseHandler<List<Medicine>> findMedicineByCategoryIdOrderByNewRelease(@PathVariable("categoryId") int categoryId
                                                                                    ) throws CustomException {

        List<Medicine> medicines = medicineService.findMedicineByCategoryIdOrderByNewRelease(categoryId);

        ResponseHandler<List<Medicine>> responseHandler = new ResponseHandler<List<Medicine>>(
                "Successfully findMedicineByCategoryIdOrderByNewRelease",
                HttpStatus.OK.value(),
                medicines);
        return responseHandler;
    }
    @GetMapping("/findMedicineByCategoryDetailId/{categoryDetailId}")
    public ResponseHandler<List<Medicine>> findMedicineByCategoryDetailId(@PathVariable("categoryDetailId") int categoryDetailId
                                                                                    ) throws CustomException {

        List<Medicine> medicines = medicineService.findMedicineByCategoryDetailId(categoryDetailId);

        ResponseHandler<List<Medicine>> responseHandler = new ResponseHandler<List<Medicine>>(
                "Successfully findMedicineByCategoryDetailId",
                HttpStatus.OK.value(),
                medicines);
        return responseHandler;
    }
    @GetMapping("/findMedicineDetailByMedicineId/{medicineId}")
    public ResponseHandler findMedicineDetailByMedicineId(@PathVariable("medicineId") int medicineId) throws CustomException {
        ResponseHandler<MedicineDetail> responseHandler = new ResponseHandler<MedicineDetail>(
                "Successfully findMedicineDetailByMedicineId",
                HttpStatus.OK.value(),
                medicineService.findMedicineDetailByMedicineId(medicineId));
        return responseHandler;
    }
    @GetMapping("/findMedicineIngredientByMedicineId/{medicineId}")
    public ResponseHandler<List<MedicineIngredient>> findMedicineIngredientByMedicineId(@PathVariable("medicineId") int medicineId
                                                                               ) throws CustomException {

        List<MedicineIngredient> medicineIngredients = medicineService.findMedicineIngredientByMedicineId(medicineId);

        ResponseHandler<List<MedicineIngredient>> responseHandler = new ResponseHandler<List<MedicineIngredient>>(
                "Successfully findIngredientByMedicineId",
                HttpStatus.OK.value(),
                medicineIngredients);
        return responseHandler;
    }

    @Operation(description = "get the best medicines in history")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "get successfully the best medicines in history"),
    })
    @GetMapping("/findBestMedicinesInHistory")
    public ResponseHandler<List<Medicine>> findBestMedicinesInHistory() {
        List<Medicine> medicines = medicineService.findBestMedicinesInHistory();
        return new ResponseHandler<List<Medicine>>("get successfully the best medicines in history", HttpStatus.OK.value(), medicines );
    }

    @Operation(description = "get medicines by object")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "get successfully medicines by object"),
    })
    @GetMapping("/findMedicinesByObject/{object}")
    public ResponseHandler<List<Medicine>> findMedicinesByObject(@PathVariable String object) {
        List<Medicine> medicines = medicineService.findMedicinesByObject(object);
        return new ResponseHandler<List<Medicine>>("get successfully medicines by object", HttpStatus.OK.value(), medicines );
    }

    @Operation(description = "get medicines by category detail id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "get successfully medicines by category detail id"),
    })
    @GetMapping("/" +
            "" +
            "/{categoryDetailId}")
    public ResponseHandler<List<Medicine>> findMedicinesByCategoryDetailId(@PathVariable int categoryDetailId) {
        List<Medicine> medicines = medicineService.findMedicinesByCategoryDetailId(categoryDetailId);
        return new ResponseHandler<List<Medicine>>("get successfully medicines by category detail id", HttpStatus.OK.value(), medicines );
    }
}
