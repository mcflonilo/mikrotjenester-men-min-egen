// File: LoginService/src/main/java/com/example/loginservice/controller/UserController.java

package com.example.loginservice.controller;

import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;

@RestController
public class UserController {

    @GetMapping("/api/login")
    public OidcUser getUser(HttpSession session) {
        System.out.println("User details: " + session.getAttribute("user"));
        return (OidcUser) session.getAttribute("user");
    }
}