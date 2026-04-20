package com.klu.exp15;

import com.klu.exp15.entity.AppUser;
import com.klu.exp15.entity.EmployeeRecord;
import com.klu.exp15.entity.Role;
import com.klu.exp15.repository.AppUserRepository;
import com.klu.exp15.repository.EmployeeRecordRepository;
import java.util.Arrays;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class Exp15Application {

    public static void main(String[] args) {
        SpringApplication.run(Exp15Application.class, args);
    }

    @Bean
    CommandLineRunner seedData(
        AppUserRepository appUserRepository,
        EmployeeRecordRepository employeeRecordRepository,
        PasswordEncoder passwordEncoder
    ) {
        return args -> {
            if (appUserRepository.count() == 0) {
                AppUser admin = new AppUser("admin", passwordEncoder.encode("admin123"), Role.ADMIN);
                AppUser employee = new AppUser("employee", passwordEncoder.encode("employee123"), Role.EMPLOYEE);
                appUserRepository.saveAll(Arrays.asList(admin, employee));
            }

            if (employeeRecordRepository.count() == 0) {
                employeeRecordRepository.saveAll(Arrays.asList(
                    new EmployeeRecord("Ananya Rao", "Engineering", "ananya.rao@corpportal.com", "Java Developer"),
                    new EmployeeRecord("Vikram Singh", "Operations", "vikram.singh@corpportal.com", "Process Analyst")
                ));
            }
        };
    }
}
