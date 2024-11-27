package com.example.loginservice.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Enumeration;

@RestController
public class LoginController {

    @GetMapping("/api/login/oauth2/code/google")
    public ResponseEntity<String> callback(OAuth2AuthenticationToken token, HttpServletRequest request) {



        // Print request details
        System.out.println("Request Method: " + request.getMethod());
        System.out.println("Request URL: " + request.getRequestURL());
        System.out.println("Request Headers: ");
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            System.out.println(headerName + ": " + request.getHeader(headerName));
        }
        if (token == null) {
            System.out.println("Authentication token is missing or invalid.");
            return ResponseEntity.badRequest().body("Authentication token is missing or invalid.");
        }

        OAuth2User user = token.getPrincipal();
        String email = user.getAttribute("email");
        String name = user.getAttribute("name");
        System.out.println("User details: " + user.getAttributes());
        return ResponseEntity.ok("Welcome, " + name + " (" + email + ")");
    }
}