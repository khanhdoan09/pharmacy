package com.project.pharmacy.controller;

import com.project.pharmacy.dto.VoucherDto;
import com.project.pharmacy.entity.Voucher;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.service.VoucherService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/voucher")
public class VoucherController {
    @Autowired
    private VoucherService voucherService;

    @Autowired
    private ModelMapper mapper;

    @Operation(description = "find vouchers by beginning date between and expiration date")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "successfully found vouchers by beginning date between " +
                    "and expiration date"),
            @ApiResponse(responseCode = "404", description = "not found vouchers by beginning date between and " +
                    "expiration date",
                    content = @Content(schema = @Schema(implementation = ResponseHandler.class)))
    })
    @GetMapping("/findVouchersFromDateToDate")
    public ResponseHandler<List<VoucherDto>> findAllByBeginningDateLessThanEqualAndExpirationDateGreaterThanEqual(
            @RequestParam("beginningDate") String beginningDate
            , @RequestParam("expirationDate") String expirationDate) throws CustomException {
        List<Voucher> vouchers =
                voucherService.findAllByBeginningDateLessThanEqualAndExpirationDateGreaterThanEqual(
                        beginningDate,
                        expirationDate);
        List<VoucherDto> voucherDtos =
                vouchers.stream().map(voucher -> mapper.map(voucher, VoucherDto.class)).collect(Collectors.toList());
        ResponseHandler<List<VoucherDto>> responseHandler =
                new ResponseHandler<List<VoucherDto>>("successfully found vouchers by beginning date between and " +
                                                              "expiration date",
                                                      HttpStatus.OK.value(), voucherDtos);
        return responseHandler;
    }
}
