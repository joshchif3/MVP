package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Expenses;
import java.util.List;
import java.util.Optional;

public interface ExpensesService {
    Expenses saveExpense(Expenses expense);
    List<Expenses> getAllExpenses();
    Optional<Expenses> getExpenseById(int id);
    void deleteExpense(int id);
}
