package com.project.pharmacy.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

@Data
@AllArgsConstructor
public class ResponseHandler<T> {
    private String message;
    private int status;
    private T data;
}