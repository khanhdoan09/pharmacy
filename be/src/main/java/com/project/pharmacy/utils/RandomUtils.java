package com.project.pharmacy.utils;

import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Random;
@Component
public class RandomUtils {
    public String generateRandomDigits() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < 6; i++) {
            int digit = random.nextInt(10);
            sb.append(digit);
        }

        return sb.toString();
    }

    public static void main(String[] args) {
        RandomUtils randomUtils = new RandomUtils();
        System.out.println(randomUtils.generateRandomDigits());
    }
}
