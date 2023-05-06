package com.project.pharmacy.service;

import com.project.pharmacy.entity.Comment;
import com.project.pharmacy.entity.Likes;
import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.repository.CommentRepository;
import com.project.pharmacy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserRepository userRepository;

    public List<Comment> findAllComments() {
        List<Comment> comments = commentRepository.findAll();
        comments.sort(Comparator.comparing(a -> a.getId()));
        return comments;
    }


    public void postComment(String userEmail, int medicineId, String content) {
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Calendar cal = Calendar.getInstance();
        User user =
                userRepository.findAll().stream().filter(u -> u.getEmail().equals(userEmail.trim())).findFirst().get();
        List<Likes> likes = new ArrayList<>();


        Comment comment = new Comment(0, user.getId(), medicineId, content, 0, dateFormat.format(cal.getTime()), 0,
                                      user, likes);
        commentRepository.save(comment);

    }

    public List<Comment> findCommentsByMedicineIdOrderByCreateDate(int medicineId) throws CustomException {
        List<Comment> comments = commentRepository.findCommentsByMedicineIdOrderByCreateDate(medicineId);
        if (comments.size() == 0) {
            throw new CustomException(
                    HttpStatus.NOT_FOUND,
                    "Can't findCommentsByMedicineIdOrderByCreateDate is " + medicineId);
        }
        return comments;
    }

    public void responseComment(String userEmail, int commentId, int medicineId, String content) throws CustomException {
        User user =
                userRepository.findAll().stream().filter(u -> u.getEmail().equals(userEmail.trim())).findFirst().get();
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Calendar cal = Calendar.getInstance();
        String roleUser = user.getRole().trim();

        switch (roleUser) {
            case "client":
                throw new CustomException(HttpStatus.UNAUTHORIZED, "You do not have permission to use this function");
            case "staff":
                List<Likes> likes = new ArrayList<>();
                Comment comment = new Comment(0, user.getId(), medicineId, content, commentId,
                                              dateFormat.format(cal.getTime()), 0,
                                              user, likes);
                commentRepository.save(comment);
                break;
            case "admin":
                System.out.println("Handle admin response function");
        }
    }


}
