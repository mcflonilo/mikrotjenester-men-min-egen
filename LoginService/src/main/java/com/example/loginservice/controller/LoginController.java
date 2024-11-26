package com.example.loginservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @GetMapping("/api/login/oauth2/code/google")
    public ResponseEntity<String> callback(OAuth2AuthenticationToken token) {
        OAuth2User user = token.getPrincipal();
        String email = user.getAttribute("email");
        String name = user.getAttribute("name");
        System.out.println("User details: " + user.getAttributes());
        return ResponseEntity.ok("Welcome, " + name + " (" + email + ")");
    }
}