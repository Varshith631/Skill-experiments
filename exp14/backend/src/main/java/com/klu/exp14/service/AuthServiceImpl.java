package com.klu.exp14.service;

import com.klu.exp14.dto.AuthResponse;
import com.klu.exp14.dto.LoginRequest;
import com.klu.exp14.dto.RegisterRequest;
import com.klu.exp14.dto.UserProfileResponse;
import com.klu.exp14.entity.AppUser;
import com.klu.exp14.repository.AppUserRepository;

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
        if (appUserRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        if (appUserRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        AppUser user = new AppUser();
        user.setName(request.getName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        appUserRepository.save(user);

        return "User registered successfully";
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        AppUser user = appUserRepository.findByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        return new AuthResponse("Login successful", user.getId(), user.getUsername());
    }

    @Override
    public UserProfileResponse getProfileByUsername(String username) {
        AppUser user = appUserRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserProfileResponse(
            user.getId(),
            user.getName(),
            user.getUsername(),
            user.getEmail()
        );
    }
}
