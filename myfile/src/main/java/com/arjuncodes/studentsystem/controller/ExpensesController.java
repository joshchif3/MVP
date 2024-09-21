package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Expenses;
import com.arjuncodes.studentsystem.service.ExpensesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/expenses")
public class ExpensesController {

    @Autowired
    private ExpensesService expensesService;

    @PostMapping
    public ResponseEntity<Expenses> createExpense(@RequestBody Expenses expense) {
        Expenses savedExpense = expensesService.saveExpense(expense);
        return new ResponseEntity<>(savedExpense, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Expenses>> getAllExpenses() {
        List<Expenses> expenses = expensesService.getAllExpenses();
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Expenses>> getExpenseById(@PathVariable int id) {
        Optional<Expenses> expense = expensesService.getExpenseById(id);
        return expense.isPresent() ? new ResponseEntity<>(expense, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expenses> updateExpense(@PathVariable int id, @RequestBody Expenses expense) {
        if (!expensesService.getExpenseById(id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        expense.setId(id);
        Expenses updatedExpense = expensesService.saveExpense(expense);
        return new ResponseEntity<>(updatedExpense, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable int id) {
        if (!expensesService.getExpenseById(id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        expensesService.deleteExpense(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
