package com.arjuncodes.studentsystem.controller.dto;

import com.arjuncodes.studentsystem.model.Employee;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Date;

@Builder
@Getter
public class RestEmployee {
    private long id;
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

    public static RestEmployee fromDomain(Employee employee) {
        return RestEmployee.builder()
                .id(employee.getId())
                .name(employee.getName())
                .surname(employee.getSurname())
                .address(employee.getAddress())
                .role(employee.getRole())
                .location(employee.getLocation())
                .salary(employee.getSalary())
                .startDate(employee.getStartDate())
                .endDate(employee.getEndDate())
                .company(employee.getCompany())
                .companyTerm(employee.getCompanyTerm())
                .status(employee.getStatus())
                .email(employee.getEmail())
                .build();
    }
}
