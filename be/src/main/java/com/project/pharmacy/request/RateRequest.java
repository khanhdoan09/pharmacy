package com.project.pharmacy.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RateRequest {
    private int medicineId;
    private int userId;
    private int star;
    private String content;
    private String userEmail;
}
