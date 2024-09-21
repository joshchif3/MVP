package com.arjuncodes.studentsystem.model;

import lombok.*;
import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "paypersondb")
public class PayPerson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long employeeId;

    private String name;
    private String surname;
    private String company;
    private double salary; // Annual gross salary
    private double salaryAfterTaxPerYear; // Annual net salary
    private double salaryPerMonth; // Monthly gross salary
    private double salaryAfterTaxPerMonth; // Monthly net salary
    private LocalDate leaveStartDate;
    private LocalDate leaveEndDate;
    private double leaveDaysLeftPerYear;
    private boolean isLeavePaid;
    private long leaveDaysTakenPerYear;
    private long leaveDaysTakenPerMonth;
    private double deductions;
    private double rebate;
}
