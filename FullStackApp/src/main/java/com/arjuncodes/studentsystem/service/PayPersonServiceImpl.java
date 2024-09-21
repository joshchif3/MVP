package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Employee;
import com.arjuncodes.studentsystem.model.PayPerson;
import com.arjuncodes.studentsystem.repository.EmployeeRepositoryz;
import com.arjuncodes.studentsystem.repository.PayPersonRepository;
import com.arjuncodes.studentsystem.repository.entity.EmployeeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class PayPersonServiceImpl implements PayPersonService {

    @Autowired
    private PayPersonRepository payPersonRepository;

    @Autowired
    private EmployeeRepositoryz employeeRepository;

    @Override
    public BigDecimal calculateTax(BigDecimal salary) {
        BigDecimal tax = BigDecimal.ZERO;
        BigDecimal taxableIncome = salary.subtract(getDeductions());

        if (taxableIncome.compareTo(BigDecimal.valueOf(237_100)) <= 0) {
            tax = taxableIncome.multiply(BigDecimal.valueOf(0.18));
        } else if (taxableIncome.compareTo(BigDecimal.valueOf(370_500)) <= 0) {
            tax = BigDecimal.valueOf(42_678).add(taxableIncome.subtract(BigDecimal.valueOf(237_100))
                    .multiply(BigDecimal.valueOf(0.26)));
        } else if (taxableIncome.compareTo(BigDecimal.valueOf(512_800)) <= 0) {
            tax = BigDecimal.valueOf(77_362).add(taxableIncome.subtract(BigDecimal.valueOf(370_500))
                    .multiply(BigDecimal.valueOf(0.31)));
        }

        return tax.subtract(getRebate());
    }

    @Override
    public BigDecimal calculateUIF(BigDecimal salary) {
        return salary.multiply(BigDecimal.valueOf(0.01)).setScale(2, RoundingMode.HALF_UP);
    }

    @Override
    public double deduction(PayPerson payPerson, double amountD) {
        double currentSalary = payPerson.getSalary();
        payPerson.setSalary(currentSalary - amountD);
        payPersonRepository.save(payPerson);
        return payPerson.getSalary();
    }

    @Override
    public void calculateFinalPayForAllEmplos() {
        List<PayPerson> payPersons = payPersonRepository.findAll();
        for (PayPerson payPerson : payPersons) {
            calculateFinalPay(payPerson);
        }
    }

    private void calculateFinalPay(PayPerson payPerson) {
        BigDecimal salary = BigDecimal.valueOf(payPerson.getSalary());
        BigDecimal tax = calculateTax(salary);
        BigDecimal salaryAfterTax = salary.subtract(tax).max(BigDecimal.ZERO);

        payPerson.setSalaryAfterTax(salaryAfterTax.doubleValue());
        payPerson.setSalaryPerYear(salary.doubleValue() * 12);
        payPerson.setSalaryAfterTaxPerYear(salaryAfterTax.doubleValue() * 12);
        payPerson.setSalaryPerMonth(salary.doubleValue());
        payPerson.setSalaryAfterTaxPerMonth(salaryAfterTax.doubleValue());

        payPersonRepository.save(payPerson);
    }

    @Override
    public List<PayPerson> getAllPayPersons() {
        return payPersonRepository.findAll();
    }

    @Override
    public PayPerson getPayPersonById(Long id) {
        return payPersonRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("PayPerson with ID " + id + " not found.")
        );
    }

    @Override
    public PayPerson savePayPerson(PayPerson payPerson) {
        return payPersonRepository.save(payPerson);
    }

    @Override
    public PayPerson updatePayPerson(Long id, PayPerson payPerson) {
        PayPerson existingPayPerson = getPayPersonById(id);
        existingPayPerson.setSalary(payPerson.getSalary());
        existingPayPerson.setLeaveDaysLeft(payPerson.getLeaveDaysLeft());
        existingPayPerson.setLeaveDaysTaken(payPerson.getLeaveDaysTaken());
        existingPayPerson.setCompany(payPerson.getCompany());
        // Update other necessary fields as needed

        return payPersonRepository.save(existingPayPerson);
    }

    @Override
    public void deletePayPerson(Long id) {
        payPersonRepository.deleteById(id);
    }

    public void migrateEmployeesToPayPersons() {
        List<EmployeeEntity> employees = employeeRepository.findAll();

        for (EmployeeEntity employee : employees) {
            // Check if the PayPerson already exists based on name, surname, and company
            boolean exists = payPersonRepository.existsByNameAndSurnameAndCompany(
                    employee.getName(), employee.getSurname(), employee.getCompany());

            if (!exists) {
                // Create new PayPerson entity if not exists
                PayPerson payPerson = new PayPerson();
                payPerson.setName(employee.getName());
                payPerson.setSurname(employee.getSurname());
                payPerson.setCompany(employee.getCompany());
                payPerson.setSalary(employee.getSalary());
              

                // Save the new PayPerson entity
                payPersonRepository.save(payPerson);
            }
        }
    }

    @Override
    public BigDecimal getGrossSalary(Long id) {
        PayPerson payPerson = getPayPersonById(id);
        return BigDecimal.valueOf(payPerson.getSalary());
    }

    @Override
    public BigDecimal getNetSalary(Long id) {
        PayPerson payPerson = getPayPersonById(id);
        return BigDecimal.valueOf(payPerson.getSalaryAfterTax());
    }

    @Override
    public double getUnpaidLeave(Long id) {
        PayPerson payPerson = getPayPersonById(id);

        double leaveAccrualRate = LeaveDaysServiceImpl.getLeaveAccrualRate();
        double unpaidLeaveDays = payPerson.getLeaveDaysTaken() - (payPerson.getLeaveDaysLeft() + leaveAccrualRate);

        return Math.max(unpaidLeaveDays, 0);
    }

    private BigDecimal getDeductions() {
        return BigDecimal.valueOf(50_000); // Example deduction
    }

    private BigDecimal getRebate() {
        return BigDecimal.valueOf(17_235); // Primary rebate
    }
}
