package com.project.pharmacy.repository;

import com.project.pharmacy.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LikesRepository extends JpaRepository<Likes, Integer> {
    @Query("select l from Likes l where l.commentId =:commentId and l.userId =:userId")
    Likes findLikeByCommentIdAndUserId(@Param("commentId") int commentId, @Param("userId") int userId);


}
