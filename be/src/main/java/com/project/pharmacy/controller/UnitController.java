package com.project.pharmacy.controller;

import com.project.pharmacy.entity.Unit;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.service.UnitService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/unit")
public class UnitController {

    @Autowired
    private UnitService unitService;

    @Autowired
    private ModelMapper mapper;

    @Operation(description = "get all units of a medicine")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "server successfully get all units of a medicine"),
            @ApiResponse(responseCode = "400", description = "parameter must be greater than 0"),
            @ApiResponse(responseCode = "404", description = "no units of a medicine were found",
                    content = @Content(schema = @Schema(implementation = ResponseHandler.class)))
    })
    @GetMapping("/get/{medicineId}")
    public ResponseHandler<List<Unit>> findMedicinesByUserId(@PathVariable int medicineId) throws CustomException {
        List<Unit> units = unitService.findAllUnitsInAMedicine(medicineId);
        ResponseHandler<List<Unit>> responseHandler = new ResponseHandler<List<Unit>>("server successfully get all " +
                                                                                              "units of a medicine",
                                                                                      200, units);
        return responseHandler;
    }
}
