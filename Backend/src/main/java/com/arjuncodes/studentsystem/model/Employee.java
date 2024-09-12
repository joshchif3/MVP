package com.arjuncodes.studentsystem.model;

import lombok.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;


@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
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


}
