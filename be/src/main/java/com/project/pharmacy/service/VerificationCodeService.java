package com.project.pharmacy.service;

import com.project.pharmacy.entity.User;
import com.project.pharmacy.entity.VerificationCode;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.repository.UserRepository;
import com.project.pharmacy.repository.VerificationCodeRepository;
import com.project.pharmacy.utils.MailUtils;
import com.project.pharmacy.utils.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;

@Service
public class VerificationCodeService {
    @Autowired
    VerificationCodeRepository verificationCodeRepository;
    @Autowired
    RandomUtils randomUtils;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MailUtils mailUtils;


    public void sendVerificationCode(String email) throws CustomException {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            String verificationCode = randomUtils.generateRandomDigits();
            LocalDateTime expiryDateTime = LocalDateTime.now().plusMinutes(1);
            VerificationCode codeEntity =
                    verificationCodeRepository.findAll().stream().filter(x -> x.getUser() == user).findFirst().orElse(null);
            if (codeEntity == null) {
                VerificationCode newCodeEntity = new VerificationCode();
                newCodeEntity.setCode(verificationCode);
                newCodeEntity.setExpiryDateTime(expiryDateTime);
                newCodeEntity.setUsed(false);
                newCodeEntity.setCreatedDate(LocalDateTime.now());
                newCodeEntity.setUser(user);
                verificationCodeRepository.save(newCodeEntity);
            } else {
                codeEntity.setCode(verificationCode);
                codeEntity.setExpiryDateTime(expiryDateTime);
                codeEntity.setUsed(false);
                codeEntity.setUser(user);
                codeEntity.setCreatedDate(LocalDateTime.now());
                verificationCodeRepository.save(codeEntity);
                mailUtils.sendMail(email, verificationCode, "Khôi phục mật khẩu Pharmacy", "<html>\n" +
                        "<head>\n" +
                        "    <style>\n" +
                        "        /* CSS styles */\n" +
                        "        body {\n" +
                        "            margin: 0;\n" +
                        "            padding: 0;\n" +
                        "            background-color: #f5f5f5;\n" +
                        "            font-family: Arial, sans-serif;\n" +
                        "        }\n" +
                        "        .container {\n" +
                        "            max-width: 600px;\n" +
                        "            margin: 0 auto;\n" +
                        "            padding: 20px;\n" +
                        "            background-color: #0080ff;\n" +
                        "            border-radius: 4px;\n" +
                        "            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n" +
                        "        }\n" +
                        "        .header {\n" +
                        "            text-align: center;\n" +
                        "            margin-bottom: 20px;\n" +
                        "        }\n" +
                        "        .header h2 {\n" +
                        "            color: #ffffff;\n" +
                        "            font-size: 24px;\n" +
                        "        }\n" +
                        "        .content {\n" +
                        "            margin-bottom: 20px;\n" +
                        "            padding: 20px;\n" +
                        "            background-color: #ffffff;\n" +
                        "            border-radius: 4px;\n" +
                        "            color: #333333;\n" +
                        "            font-size: 16px;\n" +
                        "        }\n" +
                        "        .highlight {\n" +
                        "            font-weight: bold;\n" +
                        "            font-size: 20px;\n" +
                        "            position: relative;\n" +
                        "            cursor: pointer;\n" +
                        "        }\n" +
                        "        .highlight::after {\n" +
                        "            content: \"Copy\";\n" +
                        "            position: absolute;\n" +
                        "            top: -20px;\n" +
                        "            left: 50%;\n" +
                        "            transform: translateX(-50%);\n" +
                        "            background-color: #333333;\n" +
                        "            color: #ffffff;\n" +
                        "            padding: 4px 8px;\n" +
                        "            border-radius: 4px;\n" +
                        "            opacity: 0;\n" +
                        "            transition: opacity 0.2s ease-in-out;\n" +
                        "        }\n" +
                        "        .highlight:hover::after {\n" +
                        "            opacity: 1;\n" +
                        "        }\n" +
                        "    </style>\n" +
                        "</head>\n" +
                        "<body>\n" +
                        "    <div class=\"container\">\n" +
                        "        <div class=\"header\">\n" +
                        "            <h2>Khôi phục mật khẩu</h2>\n" +
                        "        </div>\n" +
                        "        <div class=\"content\">\n" +
                        "            <p>Xin lỗi vì sự bất tiện này, nhưng chúng tôi đã nhận được yêu cầu " +
                        "khôi phục mật khẩu của bạn.</p>\n" +
                        "            <p>Mã khôi phục của bạn là: <span class=\"highlight\" " +
                        "onclick=\"copyCode(this)\">" + verificationCode + "</span></p>\n" +
                        "            <p>Vui lòng sử dụng mã này để đặt lại mật khẩu của bạn.</p>\n" +
                        "            <p>Xin lỗi nếu bạn không yêu cầu khôi phục mật khẩu này, bạn có thể " +
                        "bỏ qua email này.</p>\n" +
                        "        </div>\n" +
                        "    </div>\n" +
                        "\n" +
                        "    <script>\n" +
                        "        function copyCode(element) {\n" +
                        "            var code = element.innerText;\n" +
                        "            var textarea = document.createElement('textarea');\n" +
                        "            textarea.value = code;\n" +
                        "            document.body.appendChild(textarea);\n" +
                        "            textarea.select();\n" +
                        "            document.execCommand('copy');\n" +
                        "            document.body.removeChild(textarea);\n" +
                        "            alert('Mã code đã được sao chép!');\n" +
                        "        }\n" +
                        "    </script>\n" +
                        "</body>\n" +
                        "</html>");
            }
        } else {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't find user to perform reset password");
        }

    }

    private void sendVerificationCodeToUser(String verificationCode, String userEmail) {
        // Gửi mã xác nhận đến người dùng qua email hoặc tin nhắn SMS
        // Implement logic gửi email hoặc tin nhắn ở đây
    }

    public VerificationCode verificationCode(String code, String email) throws CustomException {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't find user");
        } else {
            VerificationCode verificationCode = verificationCodeRepository.findByCodeAndUserId(code, user.getId());
            if (verificationCode == null) {
                throw new CustomException(HttpStatus.NOT_FOUND, "Can't find verification code");
            } else if (verificationCode.isUsed() == true) {
                throw new CustomException(HttpStatus.NOT_FOUND, "Code is used");
            } else if (verificationCode.isExpired()) {
                throw new CustomException(HttpStatus.NOT_FOUND, "Code is is expired");
            } else {
                verificationCode.setUsed(true);
                verificationCodeRepository.save(verificationCode);
                return verificationCode;
            }
        }
    }

    public void resetPassword(String newPassword, String email) throws CustomException {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            user.setPassword(newPassword);
            userRepository.save(user);
        } else {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't find user");
        }
    }


}
