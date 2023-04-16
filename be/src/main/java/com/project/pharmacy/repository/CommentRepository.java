package com.project.pharmacy.repository;

import com.project.pharmacy.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {


    @Query("select c from Comment c join Medicine m on c.medicineId = m.id where c.medicineId = :medicineId order by " +
            "c.id desc")
    List<Comment> findCommentsByMedicineIdOrderByCreateDate(@Param("medicineId") int medicineId);

    @Query("select c from Comment c join Medicine m on c.medicineId = m.id where c.id = :commentId  and c.medicineId " +
            "= :medicineId")
    Comment findCommentsByCommentIdAndMedicineId(
            @Param("commentId") int commentId, @Param("medicineId") int medicineId);

    @Query("select c from Comment c where c.id = :commentId")
    Comment findCommentById(@Param("commentId") int commentId);
//    @Query("select c from Comment c join User u on u.id = c.userId on Medicine m on m.id = c.medicineId where ")
//    Comment findCommentByCommentIdAndUserIdAndByMedicineId(@Param("commentId") int commentId,
//                                                           @Param("userId") int userId, @Param("medicationId") int
//                                                           medicationId);
}
