package com.project.pharmacy.service;

import com.project.pharmacy.entity.Cart;
import com.project.pharmacy.entity.Medicine;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.repository.CartRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyInt;

@RunWith(SpringRunner.class)
@SpringBootTest
class CartServiceTest {

    @Mock
    private CartRepository cartRepository;

    @InjectMocks
    private CartService cartService;

    @BeforeEach
    public void setUp() {
        Medicine medicine = new Medicine();
        medicine.setId(1);
        medicine.setName("medicine 1");
        List<Cart> list = new ArrayList<Cart>();
        Cart cart = new Cart(1, 1, medicine, 1, "", "", null);
        list.add(cart);
        Mockito.when(cartRepository.findByUserId(anyInt())).thenReturn(list);
    }

    @ParameterizedTest
    @ValueSource(ints = {-1, 1, 2})
    @DisplayName("test find medicine in cart by user id")
    public void testFindMedicineInCart(int userId) throws CustomException {
        try {
            List<Cart> carts = cartService.findMedicinesInCart(userId);
            assertThat(carts.get(0).getMedicine().getId(), is(1));
        } catch (CustomException e) {
            assertEquals(e.getStatus(), HttpStatus.NOT_FOUND);
            assertEquals("no medicine was not found in cart by user id", e.getMessage());
        }
    }
}
