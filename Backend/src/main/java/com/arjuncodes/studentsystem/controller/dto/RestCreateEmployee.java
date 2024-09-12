package com.arjuncodes.studentsystem.controller.dto;

import com.arjuncodes.studentsystem.model.Employee;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Date;

@Builder
@Getter
public class RestCreateEmployee {
    private String name;
    private String surname;
    private String address;
    private String role;
    private String location;
    private long salary;
    private LocalDate startDate;
    private LocalDate endDate;
    private String company;
    private String companyTerm;
    private String status;
    private String email;

    public Employee toDomain() {
        return Employee.builder()
                .name(getName())
                .surname(getSurname())
                .address(getAddress())
                .role(getRole())
                .location(getLocation())
                .salary(getSalary())
                .startDate(getStartDate())
                .endDate(getEndDate())
                .company(getCompany())
                .companyTerm(getCompanyTerm())
                .status(getStatus())
                .email(getEmail())
                .build();
    }
}
