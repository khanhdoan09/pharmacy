package com.project.pharmacy.controller;

import com.project.pharmacy.dto.UserDto;
import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapper mapper;

    @Operation(description = "find user by id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "successfully found user"),
            @ApiResponse(responseCode = "404", description = "not found user by id", content = @Content(schema =
            @Schema(implementation = ResponseHandler.class)))
    })
    @GetMapping("/findUser/{userId}")
    public ResponseHandler<UserDto> findUserById(@PathVariable int userId) throws CustomException {
        User user = userService.findById(userId);
        UserDto userDto = mapper.map(user, UserDto.class);
        ResponseHandler<UserDto> responseHandler = new ResponseHandler<UserDto>("successfully found user",
                                                                                HttpStatus.OK.value(), userDto);
        return responseHandler;
    }


//    @GetMapping("/login/microsoft")
//    public String loginWithMicrosoft() throws CustomException {
//        System.out.println(123);
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        OidcUser user = ((OidcUser) authentication.getPrincipal());
//        if (user == null) {
//            System.out.println("err");
//            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "error in server");
//        }
//        String jwt = user.getIdToken().getTokenValue();
//        String email = user.getPreferredUsername();
//        String password = "";
//        try {
//            userService.findByEmailAndPassword(email, password);
//        } catch (CustomException e) {
//            if (e.getStatus().value() == HttpStatus.NOT_FOUND.value()) {
//                String name = user.getFullName();
//                String phoneNumber = user.getPhoneNumber();
//                userService.saveNewClientUser(name, email, password, phoneNumber, "microsoft", null);
//            } else {
//                throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "error in server");
//            }
//        }
//        return jwt;
//    }

    @Operation(description = "check user exist otherwise add new user")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "check successfully"),
            @ApiResponse(responseCode = "500", description = "error in server", content = @Content(schema =
            @Schema(implementation = ResponseHandler.class)))
    })
    @PostMapping("/check/login/exist")
    public ResponseHandler checkUserExistOtherwiseAddNewUser(@Valid @ModelAttribute User user) throws CustomException {
        try {
            userService.findByEmailAndPassword(user.getEmail(), user.getPassword());
        } catch (CustomException e) {
            if (e.getStatus().value() == HttpStatus.NOT_FOUND.value()) {
                userService.saveNewClientUser(user.getName(), user.getEmail(), user.getPassword(), "", "microsoft",
                                              null);
            } else {
                throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "error in server");
            }
        }
        ResponseHandler responseHandler = new ResponseHandler("check successfully", HttpStatus.OK.value(), null);
        return responseHandler;
    }

    @Operation(description = "logout server")
    @ApiResponses({
            @ApiResponse(responseCode = "", description = "logout successfully", content = @Content(schema =
            @Schema(implementation = ResponseHandler.class)))
    })
    @GetMapping("/logout")
    public ResponseHandler logoutPage() {
        ResponseHandler responseHandler = new ResponseHandler("logout successfully", HttpStatus.OK.value(), null);
        SecurityContextHolder.getContext().setAuthentication(null);
        return responseHandler;
    }

    @Operation(description = "unauthorized api")
    @ApiResponses({
            @ApiResponse(responseCode = "401", description = "invalid access permission", content = @Content(schema =
            @Schema(implementation = ResponseHandler.class)))
    })
    @GetMapping("/unauthorized")
    public ResponseHandler unauthorized() {
        ResponseHandler responseHandler = new ResponseHandler("invalid access permission",
                                                              HttpStatus.UNAUTHORIZED.value(), null);
        return responseHandler;
    }
}
