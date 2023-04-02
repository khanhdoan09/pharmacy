package com.project.pharmacy.controller;

import com.project.pharmacy.dto.UserDto;
import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.security.VerifyJwtToken;
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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

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

    @Operation(description = "logout server")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "logout successfully", content = @Content(schema =
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
    public ResponseHandler unauthorized(HttpServletRequest request) {
        String message = null;
        if (request.getAttribute("exception message") != null) {
            message = request.getAttribute("exception message").toString();
        } else {
            message = "token is invalid";
        }
        ResponseHandler responseHandler = new ResponseHandler(message,
                                                              HttpStatus.UNAUTHORIZED.value(), null);
        return responseHandler;
    }

    @Operation(description = "login with access token")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "successfully found user"),
    })
    @GetMapping("/loginWithAccessToken")
    public ResponseHandler<String> loginWithAccess(HttpServletRequest request) throws CustomException {
        String accessToken = userService.getAccessTokenFromRequest(request);
        VerifyJwtToken verifyJwtToken = userService.getVerifyJwtToken(request);
        verifyJwtToken.verifyJwtToken(accessToken);
        ResponseHandler<String> responseHandler = new ResponseHandler<String>(
                "login successfully",
                HttpStatus.OK.value(),
                verifyJwtToken.getUser().getName());
        return responseHandler;
    }

    @Operation(description = "register with access token")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "request successfully"),
    })
    @GetMapping("/registerWithAccessToken")
    public ResponseHandler<String> registerWithAccessToken(HttpServletRequest request) throws CustomException {
        String accessToken = userService.getAccessTokenFromRequest(request);
        VerifyJwtToken verifyJwtToken = userService.getVerifyJwtToken(request);
        verifyJwtToken.verifyJwtToken(accessToken);
        User user = verifyJwtToken.getUser();

        try {
            userService.findByEmail(user.getEmail());
            // if user is not existed so throw an exception then catch it and save new user
        }
        catch (CustomException e) {
            userService.saveNewClientUser(user.getName(), user.getEmail(),
                                          passwordEncoder.encode(user.getPassword()), null,
                                          verifyJwtToken.getAccountType(), null);
        }
        ResponseHandler<String> responseHandler = new ResponseHandler<String>(
                "request successfully", HttpStatus.OK.value(), user.getName());
        return responseHandler;
    }
}
