package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.PayPerson;
import com.arjuncodes.studentsystem.repository.PayPersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
public class LeaveDaysServiceImpl implements LeaveDaysService {

    @Autowired
    private PayPersonRepository payPersonRepository;

    // Constants for leave calculations
    private static final double WORKING_DAYS_PER_MONTH = 21.67;
    private static final double LEAVE_ACCRUAL_RATE = 1.25;  // 1.25 leave days per month

    public static double getLeaveAccrualRate() {
        return LEAVE_ACCRUAL_RATE;
    }

    @Override
    public double calculateAndSaveLeaveDays(PayPerson payPerson) {
        LocalDate startDate = payPerson.getLeaveStartDate();
        LocalDate endDate = payPerson.getLeaveEndDate();

        if (startDate == null || endDate == null || endDate.isBefore(startDate)) {
            throw new IllegalArgumentException("Invalid leave start or end date");
        }

        long totalDays = ChronoUnit.DAYS.between(startDate, endDate) + 1;
        payPerson.setLeaveDaysTaken(totalDays);
        payPersonRepository.save(payPerson);

        return totalDays;
    }

    @Override
    public double calculateLeaveDaysForYear(PayPerson payPerson) {
        double totalLeaveDays = LEAVE_ACCRUAL_RATE * 12;  // Assuming 12 months of leave accrual
        double leaveDaysLeft = totalLeaveDays - payPerson.getLeaveDaysTaken();
        leaveDaysLeft = Math.max(leaveDaysLeft, 0);  // Ensure leave days left don't go negative

        payPerson.setLeaveDaysLeft(leaveDaysLeft);
        payPersonRepository.save(payPerson);
        return leaveDaysLeft;
    }

    @Override
    public double calculateLeaveDaysForMonth(PayPerson payPerson) {
        double accruedLeave = LEAVE_ACCRUAL_RATE;  // 1.25 days per month
        double leaveDaysLeft = payPerson.getLeaveDaysLeft() + accruedLeave;

        // Ensure that leave days left don't exceed the limit
        leaveDaysLeft = Math.min(leaveDaysLeft, LEAVE_ACCRUAL_RATE * 12);
        payPerson.setLeaveDaysLeft(leaveDaysLeft);
        payPersonRepository.save(payPerson);

        return leaveDaysLeft;
    }

    @Override
    public double calculateLeaveDaysPerMonth() {
        return LEAVE_ACCRUAL_RATE;  // Default leave accrual per month
    }

    @Override
    public double calculatePayoutForLeaveDays(double salary, int leaveDaysToPayOut) {
        BigDecimal dailyRate = BigDecimal.valueOf(salary)
                .divide(BigDecimal.valueOf(WORKING_DAYS_PER_MONTH), RoundingMode.HALF_UP);
        return dailyRate.multiply(BigDecimal.valueOf(leaveDaysToPayOut)).doubleValue();
    }
}
