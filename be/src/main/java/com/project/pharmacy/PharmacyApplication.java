package com.project.pharmacy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication


//@PropertySource("classpath:application.properties")
public class PharmacyApplication {
    public static void main(String[] args) {
        SpringApplication.run(PharmacyApplication.class, args);
    }

}
