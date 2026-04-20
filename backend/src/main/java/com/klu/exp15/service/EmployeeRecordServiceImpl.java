package com.klu.exp15.service;

import com.klu.exp15.dto.EmployeeRecordRequest;
import com.klu.exp15.entity.EmployeeRecord;
import com.klu.exp15.repository.EmployeeRecordRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class EmployeeRecordServiceImpl implements EmployeeRecordService {

    private final EmployeeRecordRepository employeeRecordRepository;

    public EmployeeRecordServiceImpl(EmployeeRecordRepository employeeRecordRepository) {
        this.employeeRecordRepository = employeeRecordRepository;
    }

    @Override
    public EmployeeRecord addEmployee(EmployeeRecordRequest request) {
        EmployeeRecord employeeRecord = new EmployeeRecord(
            request.getName(),
            request.getDepartment(),
            request.getEmail(),
            request.getPosition()
        );
        return employeeRecordRepository.save(employeeRecord);
    }

    @Override
    public void deleteEmployee(Long id) {
        EmployeeRecord employeeRecord = employeeRecordRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee record not found"));
        employeeRecordRepository.delete(employeeRecord);
    }

    @Override
    public List<EmployeeRecord> getAllEmployees() {
        return employeeRecordRepository.findAll();
    }
}
