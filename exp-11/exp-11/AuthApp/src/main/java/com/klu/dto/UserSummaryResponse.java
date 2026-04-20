package com.klu.dto;

public class UserSummaryResponse {

    private Long id;
    private String name;
    private String email;
    private boolean verified;

    public UserSummaryResponse(Long id, String name, String email, boolean verified) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.verified = verified;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public boolean isVerified() {
        return verified;
    }
}
