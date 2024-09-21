package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Expenses;
import com.arjuncodes.studentsystem.repository.ExpensesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpensesServiceImpl implements ExpensesService {

    @Autowired
    private ExpensesRepository expensesRepository;

    @Override
    public Expenses saveExpense(Expenses expense) {
        return expensesRepository.save(expense);
    }

    @Override
    public List<Expenses> getAllExpenses() {
        return expensesRepository.findAll();
    }

    @Override
    public Optional<Expenses> getExpenseById(int id) {
        return expensesRepository.findById(id);
    }

    @Override
    public void deleteExpense(int id) {
        expensesRepository.deleteById(id);
    }
}
