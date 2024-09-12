package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.PayPerson;

public interface LeaveDaysService {
    double calculateAndSaveLeaveDays(PayPerson payPerson);

    double calculateLeaveDaysForYear(PayPerson payPerson);

    double calculateLeaveDaysForMonth(PayPerson payPerson);

    double calculateLeaveDaysPerMonth();

    double calculatePayoutForLeaveDays(double salary, int leaveDaysToPayOut);
}
