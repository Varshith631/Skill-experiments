package com.klu.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final boolean mailEnabled;
    private final String fromEmail;

    public EmailService(
        JavaMailSender mailSender,
        @Value("${app.mail.enabled:false}") boolean mailEnabled,
        @Value("${app.mail.from:}") String fromEmail
    ) {
        this.mailSender = mailSender;
        this.mailEnabled = mailEnabled;
        this.fromEmail = fromEmail;
    }

    public void sendOtp(String email, String otp) {
        if (!mailEnabled || fromEmail == null || fromEmail.trim().isEmpty()) {
            throw new RuntimeException("OTP email is not configured. Please start the backend with valid mail settings.");
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(email);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP is: " + otp + "\n\nUse this code to verify your account.");

        try {
            mailSender.send(message);
            System.out.println("OTP email sent to " + email);
        } catch (Exception ex) {
            System.out.println("Mail error: " + ex.getMessage());
            throw new RuntimeException("Failed to send OTP email. Please check the sender email settings and try again.");
        }
    }
}
