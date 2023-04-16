package com.project.pharmacy.controller;

import com.project.pharmacy.entity.Likes;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.service.LikesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class LikesController {
    @Autowired
    LikesService likeService;

    @GetMapping("/findLikeByCommentIdAndUserId/{commentId}/{userId}")
    public ResponseHandler findLikeByCommentIdAndUserId(@PathVariable("commentId") int commentId, @PathVariable(
            "userId") int userId) throws CustomException {
        Likes like = likeService.findLikeByCommentIdAndUserId(commentId, userId);
        ResponseHandler responseHandler;
        if (like == null) {
            responseHandler = new ResponseHandler("fail",
                                                  HttpStatus.NOT_FOUND.value(), null);
        } else {
            responseHandler = new ResponseHandler("ok",
                                                  HttpStatus.OK.value(), like);
        }


        return responseHandler;
    }

    @PostMapping("/addLike/{commentId}/{userId}")
    public ResponseHandler addLike(@PathVariable("commentId") int commentId, @PathVariable("userId") int userId) throws CustomException {
        likeService.addLike(commentId, userId);
        ResponseHandler responseHandler = new ResponseHandler("Successfully add like",
                                                              HttpStatus.OK.value(), null);
        return responseHandler;
    }

    @DeleteMapping("/unLikeComment/{commentId}/{userId}")
    public ResponseHandler unLikeComment(@PathVariable("commentId") int commentId,
                                         @PathVariable("userId") int userId) throws CustomException {
        likeService.unLikeComment(commentId, userId);
        ResponseHandler responseHandler = new ResponseHandler("Successfully unlike comment",
                                                              HttpStatus.OK.value(), null);
        return responseHandler;
    }
}
