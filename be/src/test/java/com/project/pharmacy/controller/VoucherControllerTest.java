package com.project.pharmacy.controller;

import com.project.pharmacy.dto.VoucherDto;
import com.project.pharmacy.entity.Voucher;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.service.VoucherService;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(VoucherController.class)
public class VoucherControllerTest {
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection") // to ignore error of version
    @Autowired
    private MockMvc mvc;

    @MockBean
    private VoucherService voucherService;

    @MockBean
    private ModelMapper mapper;

    @Before
    public void setUp() throws CustomException {
        List<Voucher> vouchers = new ArrayList<Voucher>();
        vouchers.add(new Voucher(1, "", 1, "", "2023-01-01", "2023-01-04"));
        Mockito.when(voucherService
                        .findAllByBeginningDateLessThanEqualAndExpirationDateGreaterThanEqual(
                                org.mockito.ArgumentMatchers.any(), org.mockito.ArgumentMatchers.any()))
                .thenReturn(vouchers);
        VoucherDto voucherDto = new VoucherDto(1, "", 20, "2023-01-01", "2023-01-04");
        Mockito.when(
                mapper.map(org.mockito.ArgumentMatchers.any(),
                        org.mockito.ArgumentMatchers.any())).thenReturn(voucherDto);
    }


    @Test
    @DisplayName("test find vouchers by beginning date between and expiration date")
    public void findAllByBeginningDateGreaterThanEqualAndExpirationDateLessThanEqual() throws Exception {
        String uri = "/api/voucher/findVouchersFromDateToDate?beginningDate=2023-01-01&expirationDate=2023-01-04";
        mvc.perform(get(uri).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.[0].beginningDate", is(greaterThanOrEqualTo("2023-01-01"))))
                .andExpect(jsonPath("$.data.[0].expirationDate", is(lessThanOrEqualTo("2023-01-04"))))
                .andExpect(jsonPath("$.message",
                        is("successfully found vouchers by beginning date between and expiration date")));
    }
}
