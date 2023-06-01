package com.project.pharmacy.controller;

import com.project.pharmacy.dto.UserDto;
import com.project.pharmacy.dto.UserInfoJwtDto;
import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.request.ActiveAccountRequest;
import com.project.pharmacy.request.PasswordRequest;
import com.project.pharmacy.request.ResetAccountRequest;
import com.project.pharmacy.request.UserRequest;
import com.project.pharmacy.response.ResponseHandler;
import com.project.pharmacy.security.JwtTokenProvider;
import com.project.pharmacy.security.VerifyJwtToken;
import com.project.pharmacy.service.UserService;
import com.project.pharmacy.service.VerificationCodeService;
import com.project.pharmacy.utils.CryptoUtils;
import com.project.pharmacy.utils.RandomUtils;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/v1/auth")
public class UserController {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RandomUtils randomUtils;

    @Autowired
    VerificationCodeService verificationCodeService;

    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    CryptoUtils cryptoUtils;




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
    public ResponseHandler unauthorized(HttpServletRequest request) throws CustomException {
        String message = null;
        if (request.getAttribute("exception message") != null) {
            message = request.getAttribute("exception message").toString();
        } else {
            message = "token is invalid";
        }
        throw new CustomException(HttpStatus.UNAUTHORIZED, message);
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

    @PostMapping("/loginNormal")
    public ResponseHandler loginNormal(@RequestBody User userData) throws CustomException {
        String password = userService.decryptedPasswordFromClient(userData.getPassword());
        User user = userService.findByEmail(userData.getEmail());
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "wrong password");
        }
        String jwt = jwtTokenProvider.generateToken(user.getEmail(), user.getName(), user.getAvatar(), user.getRole());
        UserInfoJwtDto userInfoJwtDto = new UserInfoJwtDto(user);
        userInfoJwtDto.setJwt(jwt);
        ResponseHandler<UserInfoJwtDto> responseHandler = new ResponseHandler<UserInfoJwtDto>(
                "login successfully",
                HttpStatus.OK.value(),
                userInfoJwtDto);
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
            // if user is not existed so throw an exception then catch it and save a new user
        } catch (CustomException e) {
            userService.saveNewClientUser(user.getName(), user.getEmail(),
                                          passwordEncoder.encode(user.getPassword()), null,
                                          verifyJwtToken.getAccountType(), user.getAvatar());
        }
        ResponseHandler<String> responseHandler = new ResponseHandler<String>(
                "request successfully", HttpStatus.OK.value(), user.getName());
        return responseHandler;
    }

    @GetMapping("/findUserByEmail/{email}")
    public ResponseHandler findUserByEmail(@PathVariable("email") String email) throws CustomException {
        CryptoUtils cryptoUtils = new CryptoUtils();
        User user = userService.findByEmail(cryptoUtils.decrypted(email));
        ResponseHandler responseHandler = new ResponseHandler<>(
                "Find user by email successfully",
                HttpStatus.OK.value(),
                user);
        return responseHandler;
    }

    @PutMapping("/updateInformation")
    public ResponseHandler updateInformation(HttpServletRequest request, @RequestBody UserRequest userRequest) throws CustomException {
        User user = userService.updateInformation(
                cryptoUtils.decrypted(userRequest.getEmail()),
                cryptoUtils.decrypted(userRequest.getName()),
                cryptoUtils.decrypted(userRequest.getPhoneNumber()));
        ResponseHandler responseHandler = new ResponseHandler<>(
                "Update information successfully",
                HttpStatus.OK.value(),
                userRequest);
        return responseHandler;
    }

    @PutMapping("/changePassword")
    public ResponseHandler changePassword(@RequestBody PasswordRequest passwordRequest) throws CustomException {

        CryptoUtils cryptoUtils = new CryptoUtils();
        String decryptedOldPassword = cryptoUtils.decrypted(passwordRequest.getOldPassword());
        String decryptedNewPassword = cryptoUtils.decrypted(passwordRequest.getNewPassword());
        userService.changePassword(cryptoUtils.decrypted(passwordRequest.getEmail()), decryptedOldPassword,
                                               decryptedNewPassword, passwordEncoder);
        ResponseHandler responseHandler = new ResponseHandler<>(
                "Change password successfully",
                HttpStatus.OK.value(),
                null);
        return responseHandler;
    }

    @Operation(description = "register a new user")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "register successfully a new user"),
            @ApiResponse(responseCode = "409", description = "email exists"),
    })
    @PostMapping("/registerWithForm")
    public ResponseHandler registerWithForm(@Valid @RequestBody User userData) throws CustomException {
        Optional<User> user = userService.getByUserEmail(userData.getEmail());
        if (user.isPresent()) {
            if (user.get().isActive()) {
                throw new CustomException(HttpStatus.CONFLICT, "email exists");
            }
        }
        String codeActive = userData.getEmail().hashCode() + "";
        userService.sendMail(userData.getEmail(), codeActive);

        CryptoUtils cryptoUtils = new CryptoUtils();
        String decryptedPassword = cryptoUtils.decrypted(userData.getPassword());
        String encryptedPassword = passwordEncoder.encode(decryptedPassword);
        if (user.isPresent()) {
            user.get().setCodeActiveValue(codeActive);
            user.get().setPassword(encryptedPassword);
            user.get().setName(userData.getName());
            userService.saveNewClientUserByForm(user.get());
        } else {
            userData.setCodeActiveValue(codeActive);
            userData.setAccountType("Normal");
            userData.setPassword(encryptedPassword);
            userService.saveNewClientUserByForm(userData);
        }
        ResponseHandler<String> responseHandler = new ResponseHandler<String>(
                "register successfully a new user", HttpStatus.OK.value(), null);
        return responseHandler;
    }

    @Operation(description = "active account")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "active account successfully"),
            @ApiResponse(responseCode = "400", description = "email doesn't exist <br/> code is not correct <br/> " +
                    "email cannot active <br/> code active cannot use anymore"),
    })
    @PostMapping("/activeAccount")
    public ResponseHandler activeAccount(@RequestBody ActiveAccountRequest activeAccountRequest) throws CustomException {
        userService.activeCode(
                userService.decryptedPasswordFromClient(activeAccountRequest.getEmail()),
                activeAccountRequest.getActiveCodeValue());
        ResponseHandler responseHandler = new ResponseHandler(
                "active account successfully", HttpStatus.OK.value(), null);
        return responseHandler;
    }

    @Operation(description = "send active code again")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "send active code again successfully"),
            @ApiResponse(responseCode = "406", description = "email is not correct to active code"),
    })
    @PostMapping("/sendActiveCodeAgain")
    public ResponseHandler sendActiveCodeAgain(@RequestBody Map<String, String> param) throws CustomException {
        String email = userService.decryptedPasswordFromClient(param.get("email"));
        User user = userService.findByEmail(email);
        if (!user.getAccountType().equals("Normal") || user.getCodeActiveValue() == null) {
            throw new CustomException(HttpStatus.NOT_ACCEPTABLE, "email is not correct to active code");
        }
        Random generateRandom = new Random();
        int randomNumber = generateRandom.nextInt(100) + 1;
        String newCodeActiveValue = Integer.valueOf(email.hashCode()) * randomNumber + "";
        user.setCodeActiveValue(newCodeActiveValue);
        userService.sendMail(email, newCodeActiveValue);
        userService.saveNewClientUserByForm(user);
        ResponseHandler responseHandler = new ResponseHandler(
                "send active code again successfully", HttpStatus.OK.value(), null);
        return responseHandler;
    }

    @PostMapping("/generateCode")
    public ResponseHandler generateOtpResetPassword(@RequestBody ResetAccountRequest resetAccountRequest) throws CustomException {
        verificationCodeService.sendVerificationCode(cryptoUtils.decrypted(resetAccountRequest.getEmail()));
        ResponseHandler responseHandler = new ResponseHandler(
                "Successfully generate otp", HttpStatus.OK.value(), null);
        return responseHandler;
    }

    @PostMapping("/verificationCode")
    public ResponseHandler verificationCode(@RequestBody ResetAccountRequest resetAccountRequest) throws CustomException {
        verificationCodeService.verificationCode(
                cryptoUtils.decrypted(resetAccountRequest.getCode()),
                cryptoUtils.decrypted(resetAccountRequest.getEmail()));

        ResponseHandler responseHandler = new ResponseHandler(
                "Successfully verificationCode otp", HttpStatus.OK.value(), null);
        return responseHandler;
    }

    @PostMapping("/resetPassword")
    public ResponseHandler resetPassword(@RequestBody ResetAccountRequest resetAccountRequest) throws CustomException {
        verificationCodeService.resetPassword(
                passwordEncoder.encode(resetAccountRequest.getNewPassword()),
                cryptoUtils.decrypted(resetAccountRequest.getEmail()));
        ResponseHandler responseHandler = new ResponseHandler(
                "Successfully reset password", HttpStatus.OK.value(), null);
        return responseHandler;
    }
}
