package com.project.pharmacy.controller;

import com.project.pharmacy.dto.SaveDto;
import com.project.pharmacy.entity.*;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.request.SavedRequest;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.service.MedicineService;
import com.project.pharmacy.service.SavedService;
import com.project.pharmacy.service.UserService;
import com.project.pharmacy.utils.CryptoUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class MedicineController {
    @Autowired
    private MedicineService medicineService;

    @Autowired
    private UserService userService;

    @Autowired
    private SavedService savedService;

    @Autowired
    private ModelMapper mapper;
    @Autowired
    CryptoUtils cryptoUtils;

    @GetMapping("/getMedicines")
    public ResponseHandler getMedicines() {
        ResponseHandler responseHandler = new ResponseHandler("Successfully get medicines",
                                                              HttpStatus.OK.value(), medicineService.getMedicines());
        return responseHandler;
    }

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

    @GetMapping("/findBySlugFieldAndSlugCategoryWithPage/{slugField}/{slugCategory}/{page}/{pageSize}")
    public ResponseHandler findBySlugFieldAndSlugCategoryWithPage(@PathVariable("slugField") String slugField,
                                                                  @PathVariable("slugCategory") String slugCategory,
                                                                  @PathVariable("page") int page,
                                                                  @PathVariable("pageSize") int pageSize) throws CustomException {
        Page<Medicine> medicines = medicineService.findBySlugFieldAndSlugCategoryWithPage(
                slugField,
                slugCategory,
                page,
                pageSize);
        ResponseHandler responseHandler = new ResponseHandler("Successfully findBySlugFieldAndSlugCategoryWithPage",
                                                              HttpStatus.OK.value(), medicines);
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
        return new ResponseHandler<List<Medicine>>("get successfully the best medicines in history",
                                                   HttpStatus.OK.value(), medicines);
    }

    @Operation(description = "get medicines by object")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "get successfully medicines by object"),
    })
    @GetMapping("/findMedicinesByObject/{object}")
    public ResponseHandler<List<Medicine>> findMedicinesByObject(@PathVariable String object) {
        List<Medicine> medicines = medicineService.findMedicinesByObject(object);
        return new ResponseHandler<List<Medicine>>("get successfully medicines by object", HttpStatus.OK.value(),
                                                   medicines);
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
        return new ResponseHandler<List<Medicine>>("get successfully medicines by category detail id",
                                                   HttpStatus.OK.value(), medicines);
    }

    @GetMapping("/findBySlugFieldAndSlugCategory/{slugField}/{slugCategory}")
    public ResponseHandler findBySlugFieldAndSlugCategory(@PathVariable("slugField") String slugField,
                                                          @PathVariable("slugCategory") String slugCategory) throws CustomException {
        ResponseHandler responseHandler = new ResponseHandler(
                "Successfully find by slug field and slug category",
                HttpStatus.OK.value(),
                medicineService.findBySlugFieldAndSlugCategory(slugField, slugCategory));
        return responseHandler;
    }


    @PostMapping("/savedMedicine")
    public ResponseHandler savedMedicine(@RequestBody SavedRequest savedRequest) throws CustomException {
        savedService.saveNewSaved((savedRequest.getEmail()), savedRequest.getMedicineId());
        ResponseHandler responseHandler = new ResponseHandler("Successfully saved medicine", HttpStatus.OK.value(),
                                                              null);
        return responseHandler;
    }

    @PostMapping("/unsavedMedicine")
    public ResponseHandler unsavedMedicine(@RequestBody SavedRequest savedRequest) throws CustomException {
        savedService.unSave((savedRequest.getEmail()), savedRequest.getMedicineId());
        ResponseHandler responseHandler = new ResponseHandler("Successfully unsaved medicine", HttpStatus.OK.value(),
                                                              null);
        return responseHandler;
    }

    @GetMapping("/findSavedByEmail/{email}")
    public ResponseHandler findSavedByEmail(@PathVariable("email") String email) throws CustomException {
        Type listType = new TypeToken<List<SaveDto>>() {
        }.getType();
        List<Saved> savedList01 = savedService.findSavedByEmail(email);
        System.out.println(savedList01);
        List<SaveDto> savedList = mapper.map(savedList01, listType);
        ResponseHandler responseHandler = new ResponseHandler("Successfully find saved by email " +
                                                                      "medicine",
                                                              HttpStatus.OK.value(), savedList);
        return responseHandler;
    }

    @GetMapping("/findSavedByEmailAndMedicineId/{email}/{medicineId}")
    public ResponseHandler findSavedByEmailAndMedicineId(@PathVariable("email") String email, @PathVariable(
            "medicineId") int medicineId) throws CustomException {
        ResponseHandler responseHandler = null;
        Saved saveCheck = savedService.findByEmailAndMedicineId(email, medicineId);
        if (saveCheck == null) {
            responseHandler = new ResponseHandler("fail", HttpStatus.NOT_FOUND.value(), false);
        } else {
            responseHandler = new ResponseHandler("oke", HttpStatus.OK.value(), true);
        }
        return responseHandler;
    }
}
