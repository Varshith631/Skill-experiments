package com.klu.exp13.repository;

import java.util.Optional;

import com.klu.exp13.entity.Student;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByEmail(String email);
}
