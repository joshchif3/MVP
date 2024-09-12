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

    private String name;
    private String surname;
    private String company;
    private double salary; // Monthly gross salary
    private double salaryAfterTax; // Monthly net salary
    private LocalDate leaveStartDate;
    private LocalDate leaveEndDate;
    private long leaveDaysTaken; // Number of leaves taken so far this year
    private double leaveDaysLeft;
    private boolean isLeavePaid; // Leave status (paid or unpaid)
    private long leaveDaysTakenPerYear; // Number of leaves taken this year
    private long leaveDaysTakenPerMonth; // Number of leaves taken this month
    private double salaryPerYear; // Annual gross salary
    private double salaryAfterTaxPerYear; // Annual net salary
    private double salaryPerMonth; // Monthly gross salary (duplicate, if needed)
    private double salaryAfterTaxPerMonth; // Monthly net salary (duplicate, if needed)

}
