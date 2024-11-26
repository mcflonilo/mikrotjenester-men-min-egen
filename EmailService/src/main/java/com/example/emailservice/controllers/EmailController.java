package com.example.emailservice.controllers;

import com.example.emailservice.service.EmailService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailController {
    @Getter
    @Setter
    public static class EmailRequest {
        private String to;
        private String subject;
        private String text;


    }


    @Autowired
    private EmailService emailService;

    @PostMapping(consumes = "application/json")
    public void sendEmail(@RequestBody EmailRequest emailRequest) {
        emailService.sendEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getText());
    }
}