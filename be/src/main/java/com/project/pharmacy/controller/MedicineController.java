package com.project.pharmacy.controller;

import com.project.pharmacy.entity.Medicine;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.service.MedicineService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class MedicineController {
    @Autowired
    private MedicineService medicineService;

    @Autowired
    private ModelMapper mapper;


    @GetMapping("/search")
    @ApiResponses({
            @ApiResponse(responseCode  = "200", description = "Successfully search medicine"),
            @ApiResponse(responseCode  = "404", description = "Can't find medicine with keyword", content = @Content(schema = @Schema(implementation = ResponseHandler.class)))
    })
    public ResponseHandler<Page<Medicine>> getMedicineByNameOrBrand(@Param("keyword") String keyword, int page,
                                                                    int pageSize) throws CustomException {

        Page<Medicine> medicines = medicineService.findByNameOrBrand(keyword, page, pageSize);

        ResponseHandler<Page<Medicine>> responseHandler = new ResponseHandler<Page<Medicine>>(
                "Successfully search medicine",
                HttpStatus.OK.value(),
                medicines);
        return responseHandler;
    }


}
