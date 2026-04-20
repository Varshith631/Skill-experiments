package com.klu.exp15.service;

import com.klu.exp15.dto.EmployeeProfileResponse;
import com.klu.exp15.dto.RegisterRequest;
import com.klu.exp15.entity.AppUser;
import com.klu.exp15.repository.AppUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(AppUserRepository appUserRepository, PasswordEncoder passwordEncoder) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String register(RegisterRequest request) {
        if (appUserRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        AppUser user = new AppUser();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        appUserRepository.save(user);
        return "User registered successfully";
    }

    @Override
    public AppUser findByUsername(String username) {
        return appUserRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public EmployeeProfileResponse getProfile(String username) {
        AppUser user = findByUsername(username);
        return new EmployeeProfileResponse(user.getId(), user.getUsername(), user.getRole().name());
    }
}
