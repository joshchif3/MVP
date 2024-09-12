package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.Expenses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpensesRepository extends JpaRepository<Expenses, Integer> {
}
