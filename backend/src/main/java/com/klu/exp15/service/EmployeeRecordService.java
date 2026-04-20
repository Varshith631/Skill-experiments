package com.klu.exp15.service;

import com.klu.exp15.dto.EmployeeRecordRequest;
import com.klu.exp15.entity.EmployeeRecord;
import java.util.List;

public interface EmployeeRecordService {
    EmployeeRecord addEmployee(EmployeeRecordRequest request);
    void deleteEmployee(Long id);
    List<EmployeeRecord> getAllEmployees();
}
