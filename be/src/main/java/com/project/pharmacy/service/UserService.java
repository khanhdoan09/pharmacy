package com.project.pharmacy.service;

import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.repository.UserRepository;
import com.project.pharmacy.security.CustomUserDetails;
import com.project.pharmacy.security.VerifyJwtToken;
import com.project.pharmacy.security.VerifyJwtTokenByFacebook;
import com.project.pharmacy.security.VerifyJwtTokenByMicrosoft;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

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

    public void saveNewClientUser(String name, String email, String password, String phoneNumber, String methodLogin, String avatar) {
        User user = new User(name, email, password, phoneNumber, null, methodLogin, avatar, "client");
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
}
