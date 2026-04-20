package com.klu.exp14.service;

import com.klu.exp14.dto.AuthResponse;
import com.klu.exp14.dto.LoginRequest;
import com.klu.exp14.dto.RegisterRequest;
import com.klu.exp14.dto.UserProfileResponse;

public interface AuthService {
    String register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    UserProfileResponse getProfileByUsername(String username);
}
