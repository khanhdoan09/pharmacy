package com.project.pharmacy.controller;

import com.project.pharmacy.entity.Comment;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.request.CommentRequest;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.service.CommentService;
import com.project.pharmacy.utils.CryptoUtils;
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
    @Autowired
    CryptoUtils cryptoUtils;

    @GetMapping("/findAllComments")
    public ResponseHandler<List<Comment>> findAllComments() {
        List<Comment> comments = commentService.findAllComments();
        ResponseHandler<List<Comment>> responseHandler = new ResponseHandler<>("Successfully findAllComments",
                                                                               HttpStatus.OK.value(), comments);
        return responseHandler;
    }

    @PostMapping("/postComment")
    public ResponseHandler postComment(@RequestBody CommentRequest commentRequest) {
        commentService.postComment(cryptoUtils.decrypted(commentRequest.getEmail()), commentRequest.getMedicineId(),
                                   cryptoUtils.decrypted(commentRequest.getContent()));
        ResponseHandler responseHandler = new ResponseHandler("Successfully post comment",
                                                              HttpStatus.OK.value(), commentRequest);
        return responseHandler;
    }

    @GetMapping("/findCommentsByMedicineId/{medicineId}")
    public ResponseHandler findCommentsByMedicineId(@PathVariable("medicineId") int medicineId) throws CustomException {
        List<Comment> comments = commentService.findCommentsByMedicineId(medicineId);
        ResponseHandler responseHandler = new ResponseHandler(
                "Successfully findCommentsByMedicineId",
                HttpStatus.OK.value(),
                comments);
        return responseHandler;
    }

    @PostMapping("/responseComment")
    public ResponseHandler responseComment(@RequestBody CommentRequest commentRequest) throws CustomException {
        commentService.responseComment(cryptoUtils.decrypted(commentRequest.getEmail()), commentRequest.getCommentId(),
                                       commentRequest.getMedicineId(),
                                       cryptoUtils.decrypted(commentRequest.getContent()));
        ResponseHandler responseHandler = new ResponseHandler("Successfully response comment",
                                                              HttpStatus.OK.value(), null);
        return responseHandler;
    }


}
