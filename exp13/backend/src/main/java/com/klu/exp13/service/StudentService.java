package com.klu.exp13.service;

import java.util.List;

import com.klu.exp13.entity.Student;

public interface StudentService {
    Student createStudent(Student student);
    List<Student> getAllStudents();
    Student updateStudent(Long id, Student student);
    void deleteStudent(Long id);
}
