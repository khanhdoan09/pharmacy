package com.project.pharmacy.service;

import com.project.pharmacy.entity.Voucher;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.repository.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoucherService {
    @Autowired
    private VoucherRepository voucherRepository;

    public List<Voucher> findAllByBeginningDateLessThanEqualAndExpirationDateGreaterThanEqual(String beginningDate, String expirationDate) throws CustomException {
        List<Voucher> vouchers = voucherRepository.findAllByBeginningDateLessThanEqualAndExpirationDateGreaterThanEqual(beginningDate, expirationDate);
        if (vouchers.isEmpty()) {
            throw new CustomException(HttpStatus.NOT_FOUND,
                                      "vouchers from " + beginningDate + " to " + expirationDate + " are not existed");
        }
        return vouchers;
    }
}
