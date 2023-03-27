package com.project.pharmacy.repository;

import com.project.pharmacy.entity.User;
import com.project.pharmacy.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {
    List<Voucher> findAllByBeginningDateLessThanEqualAndExpirationDateGreaterThanEqual(String date2, String date3);

}
