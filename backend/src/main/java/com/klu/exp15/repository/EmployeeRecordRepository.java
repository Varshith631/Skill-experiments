package com.klu.exp15.repository;

import com.klu.exp15.entity.EmployeeRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRecordRepository extends JpaRepository<EmployeeRecord, Long> {
}
