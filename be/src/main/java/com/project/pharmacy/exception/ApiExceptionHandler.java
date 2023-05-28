package com.project.pharmacy.exception;

import com.project.pharmacy.response.ResponseHandler;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(BindException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @Hidden
    public String handleBindException(BindException e) {
        System.out.println(123);
        return e.getBindingResult().hasErrors() ?
                e.getBindingResult().getAllErrors().get(0).getDefaultMessage() :
                "bad request";
    }

    @ExceptionHandler({CustomException.class})
    public ResponseEntity<ResponseHandler> customException(CustomException e) {
        ResponseHandler responseHandler = new ResponseHandler(e.getMessage(), e.getStatus().value(), null);
        return ResponseEntity.status(e.getStatus()).body(responseHandler);
    }
}
