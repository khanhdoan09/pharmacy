package com.project.pharmacy.repository;

import com.project.pharmacy.entity.Cart;
import com.project.pharmacy.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    @Query("select c from Cart c where c.user.email = :email")
    List<Cart> findByUserEmail(String email);
    @Query( "select c from Cart c where c.id in :cartIds" )
    List<Cart> findByCartId(@Param("cartIds") List<Integer> cartIds);
    Optional<Cart> findById(int id);
    void deleteById(int id);
    @Query("select c from Cart c where c.medicine.id = :medicineId and c.user.email = :email")
    Optional<Cart> findByMedicineIdAndEmail(int medicineId, String email);
}
