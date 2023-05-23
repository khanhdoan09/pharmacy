package com.project.pharmacy.controller;

import com.project.pharmacy.entity.Medicine;
import com.project.pharmacy.entity.OrderDetail;
import com.project.pharmacy.entity.Orders;
import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.request.OrderRequest;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/api/v1/order")
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderDetailService orderDetailService;

    @Autowired
    private UnitService unitService;

    @Autowired
    private CartService cartService;

    @Autowired
    private MedicineService medicineService;

    @Autowired
    private UserService userService;

    @Operation(description = "add new order")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "server successfully add new order"),
    })
    @PostMapping("/add")
    public ResponseHandler addNewOrder(@RequestBody OrderRequest data) throws CustomException {
        SimpleDateFormat date = new SimpleDateFormat("dd/MM/yyyy");
        Calendar cal = Calendar.getInstance();
        Orders newOrder = new Orders();
        newOrder.setCreateDate(date.format(cal.getTime()).toString());
        newOrder.setMessage(data.getOrder().getMessage());
        newOrder.setPaymentMethod(data.getOrder().getPaymentMethod());
        newOrder.setAddressee(data.getOrder().getAddressee());
        newOrder.setPhoneNumber(data.getOrder().getPhoneNumber());
        newOrder.setAddress(data.getOrder().getAddress());
        newOrder.setTotalPayment(data.getOrder().getTotalPayment());
        User user = userService.findByEmail(data.getOrder().getEmail());
        newOrder.setUser(user);
        List<OrderDetail> orderDetailList = new ArrayList<OrderDetail>();

        for (int i = 0; i < data.getList().size(); i++) {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setMedicine(new Medicine());
            orderDetail.setOrder(newOrder);
            orderDetail.getMedicine().setId(data.getList().get(i).getMedicineId());
            orderDetail.setPrice(data.getList().get(i).getPrice());
            orderDetail.setQuantity(data.getList().get(i).getQuantity());
            orderDetail.setUnit(data.getList().get(i).getUnit());
            orderDetailList.add(orderDetail);
            int medicineId = data.getList().get(i).getMedicineId();
            int aLLQuantityByLevelUnit = unitService.findALLQuantityByLevelUnit(
                    data.getList().get(i).getUnitId(),
                    medicineId);
            medicineService.updateTotalQuantityAndSaleQuantity(medicineId, aLLQuantityByLevelUnit);
            cartService.deleteAMedicineToCart(data.getList().get(i).getCartId());
        }
        newOrder.setOrderDetail(orderDetailList);
        orderService.saveNewOrder(newOrder);
        userService.updateRewardPoint(user, getNewRewardPoint(data.getOrder().getTotalPayment()));
        ResponseHandler responseHandler = new ResponseHandler("server successfully add new order",
                                                              HttpStatus.OK.value(), null);
        return responseHandler;
    }

    public int getNewRewardPoint(int totalPayment) {
        return totalPayment >= 500000 ? 50 :
                totalPayment >= 400000 ? 40 :
                        totalPayment >= 300000 ? 30 :
                                totalPayment >= 200000 ? 20 :
                                        totalPayment >= 100000 ? 10 :
                                                5;
    }

    @GetMapping("/get/{email}")
    public ResponseHandler<List<Orders>> getOrderByUserId(@PathVariable String email) throws CustomException {
        List<Orders> result = orderService.getOrderByEmail(email);
        ResponseHandler<List<Orders>> responseHandler = new ResponseHandler<List<Orders>>(
                "get orders by user id " +
                        "successfully",
                HttpStatus.OK.value(),
                result);
        return responseHandler;
    }

    @Operation(description = "get reward point")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "request successfully"),
    })
    @GetMapping("/getRewardPoint/{email}")
    public int getRewardPoint(@PathVariable String email) {
        return userService.getRewardPoint(email);
    }
}
