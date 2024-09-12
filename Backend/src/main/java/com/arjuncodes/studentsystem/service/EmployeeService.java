package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.controller.criteria.EmployeeFilterCriteria;
import com.arjuncodes.studentsystem.model.Employee;

import java.util.List;

public interface EmployeeService {
    Employee saveEmployee(Employee employee);
    List<Employee> getAllEmployees(EmployeeFilterCriteria filterCriteria);
    List<Employee> getAllEmployees();
    String deleteEmployeeById(Long id); // Add this method for deleting by ID
    Employee getEmployeeById(Long id);
    String updateEmployee(int id, Employee employee);
}
