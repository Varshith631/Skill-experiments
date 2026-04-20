package com.klu.exp15.service;

import com.klu.exp15.dto.EmployeeProfileResponse;
import com.klu.exp15.dto.RegisterRequest;
import com.klu.exp15.entity.AppUser;

public interface AuthService {
    String register(RegisterRequest request);
    AppUser findByUsername(String username);
    EmployeeProfileResponse getProfile(String username);
}
