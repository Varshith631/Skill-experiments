package com.klu.exp15.controller;

import com.klu.exp15.dto.EmployeeRecordRequest;
import com.klu.exp15.entity.EmployeeRecord;
import com.klu.exp15.service.EmployeeRecordService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final EmployeeRecordService employeeRecordService;

    public AdminController(EmployeeRecordService employeeRecordService) {
        this.employeeRecordService = employeeRecordService;
    }

    @PostMapping("/add")
    public ResponseEntity<EmployeeRecord> addEmployee(@Valid @RequestBody EmployeeRecordRequest request) {
        return ResponseEntity.ok(employeeRecordService.addEmployee(request));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteEmployee(@RequestParam Long id) {
        employeeRecordService.deleteEmployee(id);
        return ResponseEntity.ok("Employee record deleted successfully");
    }

    @GetMapping("/employees")
    public ResponseEntity<List<EmployeeRecord>> getEmployees() {
        return ResponseEntity.ok(employeeRecordService.getAllEmployees());
    }
}
