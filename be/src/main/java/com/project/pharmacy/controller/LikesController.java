package com.project.pharmacy.controller;

import com.project.pharmacy.entity.Likes;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.request.CommentRequest;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.service.LikesService;
import com.project.pharmacy.utils.CryptoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class LikesController {
    @Autowired
    LikesService likeService;

    @GetMapping("/findLikeByCommentIdAndUserId/{commentId}/{userEmail}")
    public ResponseHandler findLikeByCommentIdAndUserId(@PathVariable("commentId") int commentId, @PathVariable(
            "userEmail") String userEmail) throws CustomException {
        Likes like = likeService.findLikeByCommentIdAndUserId(commentId, userEmail);
        ResponseHandler responseHandler;
        if (like == null) {
            responseHandler = new ResponseHandler("fail",
                                                  HttpStatus.NOT_FOUND.value(), false);
        } else {
            responseHandler = new ResponseHandler("ok",
                                                  HttpStatus.OK.value(), true);
        }
        return responseHandler;
    }

    @PostMapping("/addLike")
    public ResponseHandler addLike(@RequestBody CommentRequest commentRequest) throws CustomException {
        CryptoUtils cryptoUtils = new CryptoUtils();
        likeService.addLike(commentRequest.getCommentId(), cryptoUtils.decrypted(commentRequest.getEmail()));
        ResponseHandler responseHandler = new ResponseHandler("Successfully add like",
                                                              HttpStatus.OK.value(), null);
        return responseHandler;
    }

    @DeleteMapping("/unLikeComment/{commentId}/{userEmail}")
    public ResponseHandler unLikeComment(@PathVariable("commentId") int commentId,
                                         @PathVariable("userEmail") String userEmail) throws CustomException {
        likeService.unLikeComment(commentId, userEmail);
        ResponseHandler responseHandler = new ResponseHandler("Successfully unlike comment",
                                                              HttpStatus.OK.value(), null);
        return responseHandler;
    }
}
