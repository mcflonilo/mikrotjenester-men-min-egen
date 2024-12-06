package com.example.emailservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import java.util.Map;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String text) {
        try {
            if (!isValidEmailAddress(to)) {
                throw new IllegalArgumentException("Invalid email address: " + to);
            }

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);

            mailSender.send(message);
        } catch (IllegalArgumentException e) {
            // Log the invalid email address error
            System.err.println("Error: " + e.getMessage());
        } catch (MailSendException e) {
            // Log the mail send error
            System.err.println("Error sending email: " + e.getMessage());
        } catch (Exception e) {
            // Log any other errors
            System.err.println("Unexpected error: " + e.getMessage());
        }
    }

    private boolean isValidEmailAddress(String email) {
        try {
            InternetAddress emailAddr = new InternetAddress(email);
            emailAddr.validate();
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public void receiveMessage(Map<String, Object> message) {
        // Extract email details from the message and call sendEmail
        String to = (String) message.get("to");
        String subject = (String) message.get("subject");
        String text = (String) message.get("text");

        sendEmail(to, subject, text);
    }
}