package com.project.pharmacy.service;

import com.project.pharmacy.entity.Comment;
import com.project.pharmacy.entity.Likes;
import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.repository.CommentRepository;
import com.project.pharmacy.repository.LikesRepository;
import com.project.pharmacy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

@Service
public class LikesService {
    @Autowired
    LikesRepository likeRepository;
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserRepository userRepository;

    public Likes findLikeByCommentIdAndUserId(int commentId, String userEmail) throws CustomException {
        User user =
                userRepository.findAll().stream().filter(u -> u.getEmail().equals(userEmail.trim())).findFirst().orElse(null);

        if (user != null) {
            Likes like = likeRepository.findLikeByCommentIdAndUserId(commentId, user.getId());
            return like;
        } else {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't findLikeByCommentIdAndUserId");
        }
    }

    public void addLike(int commentId, String userEmail) throws CustomException {
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Calendar cal = Calendar.getInstance();
        Comment comment = commentRepository.findCommentById(commentId);
        User user =
                userRepository.findAll().stream().filter(u -> u.getEmail().equals(userEmail.trim())).findFirst().orElse(null);
        if (user == null) {
            throw new CustomException(HttpStatus.NOT_FOUND, "You need register account to use like comments function");
        } else if (comment == null) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't find comment by id = " + commentId);
        } else {
            Likes liked = likeRepository.findLikeByCommentIdAndUserId(commentId, user.getId());
            if (liked != null) {
                throw new CustomException(HttpStatus.CONFLICT, "You already like this comment");
            } else {
                Likes like = new Likes(0, commentId, dateFormat.format(cal.getTime()), user.getId());
                likeRepository.save(like);
            }
        }
    }

    public void unLikeComment(int commentId, String userEmail) throws CustomException {
        User user =
                userRepository.findAll().stream().filter(u -> u.getEmail().equals(userEmail.trim())).findFirst().orElse(null);
        Likes like = likeRepository.findLikeByCommentIdAndUserId(commentId, user.getId());
        if (user == null) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't find user");
        } else if (like == null) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't find like by commentId = " + commentId + " and " +
                    "userId = " +
                    user.getId());
        } else {
            likeRepository.delete(like);
        }
    }
}
