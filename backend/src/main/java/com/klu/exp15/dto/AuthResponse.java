package com.klu.exp15.dto;

public class AuthResponse {

    private String message;
    private String token;
    private String username;
    private String role;

    public AuthResponse(String message, String token, String username, String role) {
        this.message = message;
        this.token = token;
        this.username = username;
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }
}
