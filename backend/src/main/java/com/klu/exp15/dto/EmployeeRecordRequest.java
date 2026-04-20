package com.klu.exp15.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class EmployeeRecordRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Department is required")
    private String department;

    @Email(message = "Provide a valid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Position is required")
    private String position;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }
}
