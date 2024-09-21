package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.PayPerson;
import com.arjuncodes.studentsystem.repository.PayPersonRepository;
import com.arjuncodes.studentsystem.repository.EmployeeRepositoryz;
import com.arjuncodes.studentsystem.repository.entity.EmployeeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class PayPersonServiceImpl implements PayPersonService {

    @Autowired
    private PayPersonRepository payPersonRepository;

    @Autowired
    private EmployeeRepositoryz employeeRepository;

    @Autowired
    private LeaveDaysService leaveDaysService;

    @Override
    public BigDecimal calculateTax(BigDecimal salary, BigDecimal deductions, BigDecimal rebate) {
        BigDecimal tax = BigDecimal.ZERO;
        BigDecimal taxableIncome = salary.subtract(deductions);

        // Tax Brackets for 2023/2024
        if (taxableIncome.compareTo(BigDecimal.valueOf(1_817_000)) > 0) {
            tax = BigDecimal.valueOf(644_489)
                    .add(taxableIncome.subtract(BigDecimal.valueOf(1_817_000))
                            .multiply(BigDecimal.valueOf(0.45)));
        } else if (taxableIncome.compareTo(BigDecimal.valueOf(857_900)) > 0) {
            tax = BigDecimal.valueOf(251_258)
                    .add(taxableIncome.subtract(BigDecimal.valueOf(857_900))
                            .multiply(BigDecimal.valueOf(0.41)));
        } else if (taxableIncome.compareTo(BigDecimal.valueOf(673_000)) > 0) {
            tax = BigDecimal.valueOf(179_147)
                    .add(taxableIncome.subtract(BigDecimal.valueOf(673_000))
                            .multiply(BigDecimal.valueOf(0.39)));
        } else if (taxableIncome.compareTo(BigDecimal.valueOf(512_800)) > 0) {
            tax = BigDecimal.valueOf(121_475)
                    .add(taxableIncome.subtract(BigDecimal.valueOf(512_800))
                            .multiply(BigDecimal.valueOf(0.36)));
        } else if (taxableIncome.compareTo(BigDecimal.valueOf(370_500)) > 0) {
            tax = BigDecimal.valueOf(77_362)
                    .add(taxableIncome.subtract(BigDecimal.valueOf(370_500))
                            .multiply(BigDecimal.valueOf(0.31)));
        } else if (taxableIncome.compareTo(BigDecimal.valueOf(237_100)) > 0) {
            tax = taxableIncome.multiply(BigDecimal.valueOf(0.26))
                    .add(BigDecimal.valueOf(42_678));
        } else {
            tax = taxableIncome.multiply(BigDecimal.valueOf(0.18));
        }

        // Subtract rebate and ensure tax is non-negative
        return tax.subtract(rebate).max(BigDecimal.ZERO);
    }

    @Override
    public void calculateFinalPayForAllEmplos() {
        List<PayPerson> payPersons = payPersonRepository.findAll();
        for (PayPerson payPerson : payPersons) {
            calculateFinalPay(payPerson);
        }
    }

    public void calculateFinalPay(PayPerson payPerson) {
        BigDecimal salary = BigDecimal.valueOf(payPerson.getSalary());
        BigDecimal deductions = BigDecimal.valueOf(payPerson.getDeductions());
        BigDecimal rebate = BigDecimal.valueOf(payPerson.getRebate());
        BigDecimal tax = calculateTax(salary, deductions, rebate);
        BigDecimal finalAnnualPay = salary.subtract(tax).max(BigDecimal.ZERO);

        // Calculate and set values rounded to whole numbers
        BigDecimal salaryPerMonth = salary.setScale(0, RoundingMode.HALF_UP).divide(BigDecimal.valueOf(12), RoundingMode.HALF_UP);
        BigDecimal salaryAfterTaxPerMonth = finalAnnualPay.setScale(0, RoundingMode.HALF_UP).divide(BigDecimal.valueOf(12), RoundingMode.HALF_UP);

        payPerson.setSalaryAfterTaxPerYear(finalAnnualPay.setScale(0, RoundingMode.HALF_UP).doubleValue());
        payPerson.setSalaryPerMonth(salaryPerMonth.doubleValue()); // Monthly gross salary
        payPerson.setSalaryAfterTaxPerMonth(salaryAfterTaxPerMonth.doubleValue()); // Monthly net salary

        payPersonRepository.save(payPerson);
    }

    @Override
    public PayPerson savePayPerson(PayPerson payPerson) {
        calculateFinalPay(payPerson); // Calculate final pay before saving
        PayPerson savedPayPerson = payPersonRepository.save(payPerson);
        updateEmployeeEntity(savedPayPerson); // Synchronize with EmployeeEntity
        return savedPayPerson;
    }

    @Override
    public PayPerson updatePayPerson(Long id, PayPerson payPerson) {
        // Retrieve the existing PayPerson by ID
        PayPerson existingPayPerson = payPersonRepository.findById(id).orElse(null);

        if (existingPayPerson != null) {
            // Update fields of the existing PayPerson with values from the provided payPerson
            existingPayPerson.setName(payPerson.getName());
            existingPayPerson.setSurname(payPerson.getSurname());
            existingPayPerson.setSalary(payPerson.getSalary());
            existingPayPerson.setCompany(payPerson.getCompany());
            existingPayPerson.setLeaveStartDate(payPerson.getLeaveStartDate());
            existingPayPerson.setLeaveEndDate(payPerson.getLeaveEndDate());
            existingPayPerson.setLeaveDaysTakenPerMonth(payPerson.getLeaveDaysTakenPerMonth());
            existingPayPerson.setLeaveDaysLeftPerYear(payPerson.getLeaveDaysLeftPerYear());
            existingPayPerson.setLeavePaid(payPerson.isLeavePaid());

            // Update deductions and rebate by adding the new values to the existing ones
            existingPayPerson.setDeductions(existingPayPerson.getDeductions() + payPerson.getDeductions());
            existingPayPerson.setRebate(existingPayPerson.getRebate() + payPerson.getRebate());

            // Recalculate the final pay before updating
            calculateFinalPay(existingPayPerson);

            // Update leaveDaysTakenPerYear by adding the current month's leave days to the existing annual leave taken
            existingPayPerson.setLeaveDaysTakenPerYear(
                    existingPayPerson.getLeaveDaysTakenPerYear() + payPerson.getLeaveDaysTakenPerMonth()
            );

            // Reset leaveDaysTakenPerMonth to 0 if necessary
            // Depending on your logic, you may need to reset leaveDaysTakenPerMonth
            // For instance, if it's the end of the month, or if you're tracking it manually.
            existingPayPerson.setLeaveDaysTakenPerMonth(0);

            // Save the updated PayPerson and synchronize with EmployeeEntity
            PayPerson updatedPayPerson = payPersonRepository.save(existingPayPerson);
            updateEmployeeEntity(updatedPayPerson);

            return updatedPayPerson;
        }

        return null; // Return null if the PayPerson does not exist
    }


    private void updateEmployeeEntity(PayPerson payPerson) {
        EmployeeEntity employee = employeeRepository.findById(payPerson.getEmployeeId()).orElse(null);
        if (employee != null) {
            employee.setName(payPerson.getName());
            employee.setSurname(payPerson.getSurname());
            employee.setSalary((long) payPerson.getSalary());
            employee.setCompany(payPerson.getCompany());
            employeeRepository.save(employee);
        }
    }

    @Override
    public BigDecimal getGrossSalary(Long id) {
        PayPerson payPerson = payPersonRepository.findById(id).orElse(null);
        return (payPerson != null) ? BigDecimal.valueOf(payPerson.getSalary()) : BigDecimal.ZERO;
    }

    @Override
    public BigDecimal getNetSalary(Long id) {
        PayPerson payPerson = payPersonRepository.findById(id).orElse(null);
        return (payPerson != null) ? BigDecimal.valueOf(payPerson.getSalaryAfterTaxPerYear()) : BigDecimal.ZERO;
    }

    @Override
    public double getUnpaidLeave(Long id) {
        PayPerson payPerson = payPersonRepository.findById(id).orElse(null);
        if (payPerson == null) {
            throw new IllegalArgumentException("PayPerson with ID " + id + " not found.");
        }
        double leaveDaysTaken = payPerson.getLeaveDaysTakenPerMonth();
        double leaveDaysLeft = payPerson.getLeaveDaysLeftPerYear();
        double leaveAccrualRate = LeaveDaysServiceImpl.getLeaveAccrualRate();
        double unpaidLeaveDays = leaveDaysTaken - (leaveDaysLeft + leaveAccrualRate);
        return Math.max(unpaidLeaveDays, 0);
    }

    @Override
    public BigDecimal calculateUIF(BigDecimal salary) {
        return salary.multiply(BigDecimal.valueOf(0.01)).setScale(2, RoundingMode.HALF_UP);
    }

    @Override
    public double deduction(PayPerson payPerson, double amountD) {
        double currentSalary = payPerson.getSalary();
        double newSalary = currentSalary - amountD;
        payPerson.setSalary(BigDecimal.valueOf(newSalary).setScale(0, RoundingMode.HALF_UP).doubleValue());
        payPersonRepository.save(payPerson);
        updateEmployeeEntity(payPerson); // Synchronize with EmployeeEntity
        return newSalary;
    }

    @Override
    public List<PayPerson> getAllPayPersons() {
        return payPersonRepository.findAll();
    }

    @Override
    public PayPerson getPayPersonById(Long id) {
        return payPersonRepository.findById(id).orElse(null);
    }

    @Override
    public void deletePayPerson(Long id) {
        PayPerson payPerson = payPersonRepository.findById(id).orElse(null);
        if (payPerson != null) {
            // Remove the EmployeeEntity as well
            employeeRepository.deleteById(payPerson.getEmployeeId());
            payPersonRepository.deleteById(id);
        }
    }

    @Override
    @Transactional
    public void migrateEmployeesToPayPersons() {
        List<EmployeeEntity> employees = employeeRepository.findAll();

        for (EmployeeEntity employee : employees) {
            if (employee.getId() <= 0) {
                continue; // Skip employees without a valid ID (assuming 0 or negative values are invalid)
            }

            // Fetch the existing PayPerson using the Employee ID
            PayPerson existingPayPerson = payPersonRepository.findByEmployeeId(employee.getId());

            if (existingPayPerson != null) {
                // Update existing PayPerson details to prevent duplicates
                existingPayPerson.setName(employee.getName());
                existingPayPerson.setSurname(employee.getSurname());
                existingPayPerson.setSalary(employee.getSalary());
                existingPayPerson.setCompany(employee.getCompany());
                payPersonRepository.save(existingPayPerson); // Update the record
            } else {
                // Only create a new PayPerson if it doesn't exist already
                PayPerson newPayPerson = new PayPerson();
                newPayPerson.setName(employee.getName());
                newPayPerson.setSurname(employee.getSurname());
                newPayPerson.setSalary(employee.getSalary());
                newPayPerson.setCompany(employee.getCompany());
                newPayPerson.setEmployeeId(employee.getId()); // Make sure employeeId is set
                payPersonRepository.save(newPayPerson); // Create a new record
            }
        }
    }

    @Override
    public void updateLeavePaymentStatus(PayPerson payPerson, boolean isPaid) {
        payPerson.setLeavePaid(isPaid);
        payPersonRepository.save(payPerson);
    }
}
