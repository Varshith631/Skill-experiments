package com.klu.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.klu.dto.UserSummaryResponse;
import com.klu.repository.UserRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProjectController {

    private final UserRepository userRepository;

    public ProjectController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/project-info")
    public Map<String, Object> getProjectInfo() {
        Map<String, Object> response = new HashMap<>();
        response.put("projectName", "React API Integration News Portal");
        response.put("database", "testdb");
        response.put("table", "users");
        response.put("username", "root");
        response.put("port", 8080);
        response.put("totalUsers", userRepository.count());
        return response;
    }

    @GetMapping("/users-table")
    public List<UserSummaryResponse> getUsersTableData() {
        return userRepository.findAll()
            .stream()
            .map(user -> new UserSummaryResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.isVerified()
            ))
            .collect(Collectors.toList());
    }
}
