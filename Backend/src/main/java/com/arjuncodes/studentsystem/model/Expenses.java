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
public class Expenses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String company;
    private String service;
    private double amount;
    private LocalDate date;
    private LocalDate dateDueForPayment;
}
