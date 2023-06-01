package com.project.pharmacy.service;

import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.repository.UserRepository;
import com.project.pharmacy.security.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.Calendar;
import java.util.Optional;
import java.util.Properties;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public User findById(int id) throws CustomException {
        Optional<User> user = userRepository.findById(id);
        return user.map(u -> {
            return u;
        }).orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "not found user by id"));
    }

    public User findByEmailAndPassword(String email, String password) throws CustomException {
        Optional<User> user = userRepository.findByEmailAndPassword(email, password);
        return user.map(u -> {
            return u;
        }).orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "not found user by email and password"));
    }

    public void saveNewClientUser(String name, String email, String password, String phoneNumber, String methodLogin,
                                  String avatar) {
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Calendar cal = Calendar.getInstance();
        User user = new User(name, email, password, phoneNumber, dateFormat.format(cal.getTime()), methodLogin,
                             avatar, "client");
        user.setRewardPoint(50);
        userRepository.save(user);
    }

    public void saveNewClientUserByForm(User user) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm");
        LocalDateTime now = LocalDateTime.now();
        user.setCodeActiveTime(dtf.format(now));
        user.setRole("client");
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByName(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new CustomUserDetails(user);
    }

    public VerifyJwtToken getVerifyJwtToken(HttpServletRequest request) throws CustomException {
        String account = request.getHeader("AccountType");
        switch (account) {
            case "Microsoft":
                return new VerifyJwtTokenByMicrosoft();
            case "Facebook":
                return new VerifyJwtTokenByFacebook();
            case "Google":
                return new VerifyJwtTokenByGoogle();
            case "Normal":
                return new VerifyJwtTokenByNormal();
            default:
                throw new CustomException(HttpStatus.UNAUTHORIZED, "wrong account type");
        }
    }

    public String getAccessTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public User findByEmailAndAccountType(String email, String accountType) throws CustomException {
        Optional<User> user = userRepository.findByEmailAndAccountType(email, accountType);
        return user.map(u -> {
            return u;
        }).orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "not found user by email"));
    }

    public User changePassword(String email, String oldPassword, String newPassword, PasswordEncoder passwordEncoder) throws CustomException {
        Optional<User> user = userRepository.findByEmail(email);
        if (!user.isPresent()) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Not found email");
        }
        if (passwordEncoder.matches(oldPassword, user.get().getPassword())) {
            user.get().setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user.get());
            return user.get();
        } else {
            throw new CustomException(HttpStatus.NOT_FOUND, "Incorrect password");
        }
    }

    public User findByEmail(String email) throws CustomException {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(u -> u).orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "Can't found user by " +
                "email = " + email));
    }

    public User updateInformation(String email, String name, String phone) throws CustomException {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(u -> {
            u.setName(name);
            u.setPhoneNumber(phone);
            userRepository.save(u);
            return u;
        }).orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "Account by email = " + email + " is " +
                "unregister in system"));
    }

    public void updateRewardPoint(User user, int newRewardPoint) {
        user.setRewardPoint(user.getRewardPoint() + newRewardPoint);
        userRepository.save(user);
    }

    public int getRewardPoint(String email) {
        User user = userRepository.findByEmail(email).get();
        return user.getRewardPoint();
    }

    public UserDetails getUserByEmail(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(u -> new CustomUserDetails(u)).orElseThrow(() -> new UsernameNotFoundException("not found by "
                                                                                                               + email));
    }

    public String decryptedPasswordFromClient(String password) {
        try {
            String key = "1234567812345678";
            String iv = "1234567812345678";

            Base64.Decoder decoder = Base64.getDecoder();
            byte[] encrypted1 = decoder.decode(password);

            Cipher cipher = Cipher.getInstance("AES/CBC/NoPadding");
            SecretKeySpec keyspec = new SecretKeySpec(key.getBytes(), "AES");
            IvParameterSpec ivspec = new IvParameterSpec(iv.getBytes());
            cipher.init(Cipher.DECRYPT_MODE, keyspec, ivspec);

            byte[] original = cipher.doFinal(encrypted1);
            String originalString = new String(original);
            return originalString.trim();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public Optional<User> existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public void sendMail(String toEmail, String codeActive) throws CustomException {
        String to = toEmail;
        String from = "cdw.pharmacy@gmail.com";
        String host = "smtp.gmail.com";
        Properties properties = System.getProperties();
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");
        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("cdw.pharmacy@gmail.com", "pyxklplpzeqbwoqn");
            }
        });
        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject("Mã kích hoạt tài khoản " + toEmail + " !");
            message.setText(codeActive);
            Transport.send(message);
        } catch (MessagingException mex) {
            System.out.println(mex.getMessage());
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "error in server");
        }
    }

    public void activeCode(String email, String codeActiveValue) throws CustomException {
        Optional<User> user = userRepository.findByEmail(email);
        if (!user.isPresent()) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "email doesn't exist");
        }
        if (!user.get().getCodeActiveValue().equals(codeActiveValue)) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "code is not correct");
        }
        if (user.get().isActive() || !user.get().getAccountType().equals("Normal")) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "email cannot active");
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm");
        LocalDateTime codeActiveTime = LocalDateTime.parse(user.get().getCodeActiveTime(), formatter);
        if (!checkValidityPeriodOfActiveCode(codeActiveTime)) {
            throw new CustomException(HttpStatus.GONE, "code active cannot use anymore");
        } else {
            user.get().setActive(true);
            userRepository.save(user.get());
        }
    }

    private boolean checkValidityPeriodOfActiveCode(LocalDateTime codeActiveTime) throws CustomException {
        LocalDateTime now = LocalDateTime.now();

        if (now.getYear() == codeActiveTime.getYear()
                && now.getMonthValue() == codeActiveTime.getMonthValue()
                && now.getDayOfMonth() == codeActiveTime.getDayOfMonth()
        ) {
            if (now.getHour() == codeActiveTime.getHour()) {
                return now.getMinute() - codeActiveTime.getMinute() <= 5 ? true : false;
            } else {
                return now.getHour() * 60 + now.getMinute() - codeActiveTime.getMinute()
                        * 60 + codeActiveTime.getMinute() <= 5 ? true : false;
            }
        } else {
            return false;
        }
    }

    public Optional<User> getByUserEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
