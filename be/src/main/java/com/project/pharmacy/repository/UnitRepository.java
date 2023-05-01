package com.project.pharmacy.repository;

import com.project.pharmacy.entity.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Long> {
    Optional<Unit> findById(int id);

    List<Unit> findByMedicineId(int medicineId);

    @Query(nativeQuery = true, value = "select exp(sum(log(quantity))) FROM pharmacy.unit where medicine_id = " +
            ":medicineId group by medicine_id " +
            "having 'level' <=\n" +
            " (select 'level' from pharmacy.unit where medicine_id = :medicineId and id = :unitId)")
    int findALLQuantityByLevelUnit(@Param("unitId") Integer unitId,
                                   @Param("medicineId") Integer medicineId);
}
