package com.project.pharmacy.security;

import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private VerifyJwtToken verifyJwtToken;

    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private Set<String> urls = new HashSet<>(Arrays.asList(
            "/api/v1/cart/**",
            "/api/v1/order/**",
            "/api/v1/postComment",
            "/api/v1/responseComment",
            "/api/v1/addLike",
            "/api/v1/unLikeComment/**",
            "/api/v1/saveRate"
                                                          ));
    private AntPathMatcher pathMatcher = new AntPathMatcher();

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String token = userService.getAccessTokenFromRequest(request);
        if (token != null) {
            try {
                verifyJwtToken = userService.getVerifyJwtToken(request);
                if (verifyJwtToken.verifyJwtToken(token)) {
                    UsernamePasswordAuthenticationToken authentication = null;
                    User user = verifyJwtToken.getUser();
                    try {
                        UserDetails userDetails = userService.getUserByEmail(user.getEmail());
                        authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
                                                                                 userDetails.getAuthorities());
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        filterChain.doFilter(request, response);
                    } catch (UsernameNotFoundException u) {
                        request.setAttribute("exception message", u.getMessage());
                        request.getRequestDispatcher("/api/v1/auth/unauthorized").forward(request, response);
                    }
                } else {
                    request.setAttribute("exception message", "token is invalid");
                    request.getRequestDispatcher("/api/v1/auth/unauthorized").forward(request, response);
                }
            } catch (CustomException e) {
                request.setAttribute("exception message", e.getMessage());
                request.getRequestDispatcher("/api/v1/auth/unauthorized").forward(request, response);
            }
        }
        else {
            request.setAttribute("exception message", "not found access token in header");
            request.getRequestDispatcher("/api/v1/auth/unauthorized").forward(request, response);
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return urls.stream().noneMatch(p -> pathMatcher.match(p, request.getServletPath()));
    }
}
