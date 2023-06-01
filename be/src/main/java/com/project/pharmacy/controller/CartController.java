package com.project.pharmacy.controller;

import com.project.pharmacy.entity.Cart;
import com.project.pharmacy.entity.Medicine;
import com.project.pharmacy.entity.Unit;
import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.service.CartService;
import com.project.pharmacy.service.MedicineService;
import com.project.pharmacy.service.UnitService;
import com.project.pharmacy.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.json.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private MedicineService medicineService;

    @Autowired
    private UnitService unitService;

    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper mapper;

    @Operation(description = "add new medicine to cart")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "server successfully add new medicine to cart"),
            @ApiResponse(responseCode = "400", description = "parameters must be greater than 0"),
            @ApiResponse(responseCode = "404", description =
                    "user id was not found <br/>"
                            + "medicine was not found <br/>"),
            @ApiResponse(responseCode = "410", description = "server cannot update this medicine to cart because of " +
                    "this medicine id is not active anymore"),
            @ApiResponse(responseCode = "413", description = "this medicine is not enough to order on request"),
    })
    @PostMapping("/add")
    public ResponseHandler addNewMedicineToCart(
            @RequestBody String data) throws CustomException {
        JSONObject json = new JSONObject(data);
        String email = json.get("userEmail").toString();
        int medicineId = Integer.valueOf(json.get("medicineId").toString());
        int unitId = Integer.valueOf(json.get("unitId").toString());
        int quantity = Integer.valueOf(json.get("quantity").toString());
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat date = new SimpleDateFormat("dd/MM/yyyy");
        Optional<Cart> checkCartExisted = cartService.findByMedicineIdAndUserId(medicineId, email);
        Unit unit = unitService.findUnitById(unitId);
        if (checkCartExisted.isPresent()) {
            Cart cartExisted = checkCartExisted.get();
            cartExisted.setQuantity(quantity);
            cartExisted.setCreateDate(date.format(cal.getTime()).toString());
            cartExisted.setUnit(unit);
            cartService.updateCart(cartExisted);
        }
        else {
            User user = userService.findByEmail(email);
            Cart newMedicineInCart = new Cart(user, medicineService.findById(medicineId), quantity, date.format(cal.getTime()).toString(), "", unit);
            cartService.addNewMedicineToCart(newMedicineInCart);
        }
//        cartService.checkMedicineQuantityForSale(medicine, 1);
        ResponseHandler responseHandler = new ResponseHandler("server successfully add new medicine to cart",
                                                              HttpStatus.OK.value(), null);
        return responseHandler;
    }

    @Operation(description = "get medicines in cart by user id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "server successfully get medicines in cart by user id"),
            @ApiResponse(responseCode = "400", description = "parameter must be greater than 0"),
            @ApiResponse(responseCode = "404", description = "no medicine was found in cart by user id",
                    content = @Content(schema = @Schema(implementation = ResponseHandler.class)))
    })
    @GetMapping("/get/{email}")
    public ResponseHandler<List<Cart>> findMedicinesByUserId(@PathVariable String email) throws CustomException {
        List<Cart> carts = cartService.findMedicinesInCart(email);
        ResponseHandler<List<Cart>> responseHandler = new ResponseHandler<List<Cart>>("server successfully get " +
                                                                                              "medicines in cart by " + "user id", 200, carts);
        return responseHandler;
    }

    @Operation(description = "delete a medicine in cart")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "server successfully delete a medicine in cart"),
            @ApiResponse(responseCode = "400", description = "parameters must be greater than 0"),
            @ApiResponse(responseCode = "404", description = "no medicine was found in cart by id"),
    })

    @DeleteMapping("/delete/{id}")
    public ResponseHandler deleteAMedicineInCart(@PathVariable int id) throws CustomException {
        cartService.deleteAMedicineToCart(id);
        ResponseHandler responseHandler = new ResponseHandler(
                "server successfully delete a medicine in cart",
                HttpStatus.OK.value(),
                null);
        return responseHandler;
    }

    @Operation(description = "update medicine quantity in cart")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "server successfully update medicine quantity in cart"),
            @ApiResponse(responseCode = "400", description = "parameters must be greater than 0"),
            @ApiResponse(responseCode = "404", description = "id cart was not found",
                    content = @Content(schema = @Schema(implementation = ResponseHandler.class))),
            @ApiResponse(responseCode = "410", description = "server cannot update this medicine to cart because of " +
                    "this medicine id is not active anymore"),
            @ApiResponse(responseCode = "413", description = "this medicine not enough to order on request"),
    })
    @PutMapping("/update_quantity")
    public ResponseHandler updateQuantityAMedicineInCart(@RequestParam("id") int id,
                                                         @RequestParam("quantity") int quantity,
                                                         @RequestParam("level") int level) throws CustomException {
        Medicine medicine = cartService.getMedicineByCartId(id);
        int quantityDetail = cartService.calculateQuantityByUnitLevel(medicine.getId(), level) * quantity;
        cartService.checkMedicineQuantityForSale(medicine, quantityDetail);
        cartService.updateMedicineQuantityInCart(id, quantity);
        ResponseHandler responseHandler = new ResponseHandler("server successfully update medicine quantity in cart",
                                                              HttpStatus.OK.value(), null);
        return responseHandler;
    }

    @Operation(description = "update unit medicine in cart")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "server successfully update unit medicine quantity" +
                    " in cart"),
            @ApiResponse(responseCode = "400", description = "parameters must be greater than 0"),
            @ApiResponse(responseCode = "404", description = "id cart was not found <br/> id unit was not found",
                    content = @Content(schema = @Schema(implementation = ResponseHandler.class))),
            @ApiResponse(responseCode = "410", description = "server cannot update this medicine to cart because of " +
                    "this medicine id is not active anymore"),
            @ApiResponse(responseCode = "413", description = "this medicine not enough to order on request"),
    })
    @PutMapping("/update_unit")
    public ResponseHandler updateUnitAMedicineInCart(@RequestParam("cartId") int cartId,
                                                     @RequestParam("unitId") int unitId) throws CustomException {
        cartService.updateUnit(cartId, unitId);
        ResponseHandler responseHandler = new ResponseHandler("server successfully update medicine quantity in cart",
                                                              HttpStatus.OK.value(), null);
        return responseHandler;
    }
}
