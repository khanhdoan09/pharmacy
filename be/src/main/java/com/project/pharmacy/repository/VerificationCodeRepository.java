package com.project.pharmacy.repository;

import com.project.pharmacy.entity.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {
    @Query(value = "select v from VerificationCode v where v.code = :code and v.user.id = :userId")
    VerificationCode findByCodeAndUserId(String code, int userId);
}
