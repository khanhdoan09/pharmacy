package com.project.pharmacy.service;

import com.project.pharmacy.entity.User;
import com.project.pharmacy.entity.Voucher;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.repository.VoucherRepository;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.CoreMatchers.instanceOf;
import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
class VoucherServiceTest {

    @Autowired
    private VoucherService voucherService;

    @MockBean
    private VoucherRepository voucherRepository;

    @ParameterizedTest
    @DisplayName("test find vouchers by beginning date between and expiration date")
    @CsvSource({"2023-01-01, 2023-01-04", "2023-01-02, 2023-01-03", ", 2023-01-01"})
    public void findAllByBeginningDateGreaterThanEqualAndExpirationDateLessThanEqual(String beginningDate, String expirationDate) throws CustomException {
        try {
            List<Voucher> vouchers =
                    voucherService.findAllByBeginningDateLessThanEqualAndExpirationDateGreaterThanEqual(
                            beginningDate, expirationDate);
            assertThat(vouchers.get(0)
                    , instanceOf(Voucher.class));
        } catch (CustomException e) {
            assertEquals(e.getStatus(), HttpStatus.NOT_FOUND);
            assertEquals("vouchers from " + beginningDate + " to " + expirationDate + " are not existed", e.getMessage());
        }
    }
}
