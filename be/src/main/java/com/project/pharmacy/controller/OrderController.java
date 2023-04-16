package com.project.pharmacy.controller;

import com.project.pharmacy.entity.OrderDetail;
import com.project.pharmacy.entity.Orders;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/order")
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

    @Operation(description = "add new order")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "server successfully add new order"),
    })
    @PostMapping("/add")
    public ResponseHandler addNewOrder(@RequestBody String data) throws CustomException {
        JSONObject json = new JSONObject(data);
        JSONObject dataJSON = new JSONObject(json.get("payload").toString());
        JSONObject order = new JSONObject(dataJSON.get("order").toString());
        Orders newOrder = new Orders();
        newOrder.setCreateDate(order.get("createDate").toString());
        newOrder.setMessage(order.get("message").toString());
        newOrder.setPaymentMethod(order.get("paymentMethod").toString());
        newOrder.setAddressee(order.get("addressee").toString());
        newOrder.setPhoneNumber(order.get("phoneNumber").toString());
        newOrder.setAddress(order.get("address").toString());
        newOrder.setTotalPayment(Integer.valueOf(order.get("totalPayment").toString()));
        newOrder.setUserId(Integer.valueOf(order.get("userId").toString()));
        JSONArray listOrderDetail = new JSONArray(dataJSON.get("list").toString());
        int newIdOrder = orderService.saveNewOrder(newOrder);
        for (int i = 0; i < listOrderDetail.length(); i++) {
            JSONObject odJSON = listOrderDetail.getJSONObject(i);
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrderId(newIdOrder);
            orderDetail.setMedicineId(Integer.valueOf(odJSON.get("medicineId").toString()));
            orderDetail.setPrice(Integer.valueOf(odJSON.get("price").toString()));
            orderDetail.setQuantity(Integer.valueOf(odJSON.get("quantity").toString()));
            orderDetail.setUnit(odJSON.get("unit").toString());
            orderDetailService.saveNewOrderDetail(orderDetail);
            int medicineId = Integer.parseInt(odJSON.get("medicineId").toString());
            int aLLQuantityByLevelUnit = unitService.findALLQuantityByLevelUnit(
                    Integer.parseInt(odJSON.get("unitId").toString()), medicineId);
            medicineService.updateTotalQuantityAndSaleQuantity(medicineId, aLLQuantityByLevelUnit);
            cartService.deleteAMedicineToCart(Integer.valueOf(odJSON.get("cartId").toString()));
        }
        ResponseHandler responseHandler = new ResponseHandler("server successfully add new order",
                                                              HttpStatus.OK.value(), null);
        return responseHandler;
    }
}
