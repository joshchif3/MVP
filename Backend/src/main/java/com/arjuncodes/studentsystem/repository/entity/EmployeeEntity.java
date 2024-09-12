package com.arjuncodes.studentsystem.repository.entity;

import com.arjuncodes.studentsystem.model.Employee;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "employee")
@Table(name = "employee")
public class EmployeeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public static EmployeeEntity fromDomain(Employee employee) {
        return EmployeeEntity.builder()
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

    public Employee toDomain() {
        return Employee.builder()
                .id((int) getId())
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
