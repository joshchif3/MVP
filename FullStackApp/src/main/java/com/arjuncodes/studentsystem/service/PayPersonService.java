package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.PayPerson;
import java.math.BigDecimal;
import java.util.List;

public interface PayPersonService {

    // Method to calculate tax based on salary
    BigDecimal calculateTax(BigDecimal salary);

    // Method to calculate UIF (Unemployment Insurance Fund) contribution based on salary
    BigDecimal calculateUIF(BigDecimal salary);

    // Method to deduct a specific amount from PayPerson's salary
    double deduction(PayPerson payPerson, double amountD);

    // Method to calculate final pay for all employees
    void calculateFinalPayForAllEmplos();

    // Method to retrieve all PayPerson records
    List<PayPerson> getAllPayPersons();

    // Method to retrieve a specific PayPerson by their ID
    PayPerson getPayPersonById(Long id);

    // Method to save a new PayPerson record
    PayPerson savePayPerson(PayPerson payPerson);

    // Method to update an existing PayPerson record
    PayPerson updatePayPerson(Long id, PayPerson payPerson);

    // Method to delete a PayPerson record by ID
    void deletePayPerson(Long id);

    // Method to migrate employees from another table to PayPerson table
    void migrateEmployeesToPayPersons();

    // Method to get the gross salary of a PayPerson by their ID
    BigDecimal getGrossSalary(Long id);

    // Method to get the net salary of a PayPerson by their ID
    BigDecimal getNetSalary(Long id);

    // Method to calculate unpaid leave for a specific PayPerson by their ID
    double getUnpaidLeave(Long id);
}
