package com.project.pharmacy.controller;

import com.project.pharmacy.entity.Comment;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.service.CommentService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CommentController {

    @Autowired
    CommentService commentService;


    @GetMapping("/findAllComments")
    public ResponseHandler<List<Comment>> findAllComments() {
        List<Comment> comments = commentService.findAllComments();
        ResponseHandler<List<Comment>> responseHandler = new ResponseHandler<>("Successfully findAllComments",
                                                                               HttpStatus.OK.value(), comments);
        return responseHandler;
    }

    @PostMapping("/postComment/{userId}/{medicineId}/{content}")
    public ResponseHandler postComment(@PathVariable("userId") int userId,
                                       @PathVariable("medicineId") int medicineId,
                                       @PathVariable("content") String content) {
        commentService.postComment(userId, medicineId, content);
        ResponseHandler responseHandler = new ResponseHandler("Successfully post comment",
                                                              HttpStatus.OK.value(), null);
        return responseHandler;
    }

    @GetMapping("/findCommentsByMedicineIdOrderByCreateDate/{medicineId}")
    public ResponseHandler<List<Comment>> findCommentsByMedicineId(@PathVariable("medicineId") int medicineId) throws CustomException {
        List<Comment> comments = commentService.findCommentsByMedicineIdOrderByCreateDate(medicineId);
        ResponseHandler<List<Comment>> responseHandler = new ResponseHandler<>("Successfully findCommentsByMedicineId",
                                                                               HttpStatus.OK.value(), comments);
        return responseHandler;
    }

    @PostMapping("/responseComment/{userId}/{commentId}/{medicineId}/{content}")
    public ResponseHandler responseComment(@PathVariable("userId") int userId,
                                           @PathVariable("commentId") int commentId,
                                           @PathVariable("medicineId") int medicineId,
                                           @PathVariable("content") String content) throws CustomException {
        commentService.responseComment(userId, commentId, medicineId, content);
        ResponseHandler responseHandler = new ResponseHandler("Successfully response comment",
                                                              HttpStatus.OK.value(), null);
        return responseHandler;
    }




}
