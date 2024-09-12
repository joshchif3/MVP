package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.controller.criteria.EmployeeFilterCriteria;
import com.arjuncodes.studentsystem.controller.dto.RestCreateEmployee;
import com.arjuncodes.studentsystem.controller.dto.RestEmployee;
import com.arjuncodes.studentsystem.model.Employee;
import com.arjuncodes.studentsystem.service.EmployeeService;
import com.arjuncodes.studentsystem.service.PayPersonService; // Import PayPersonService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/employee")
@CrossOrigin
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private PayPersonService payPersonService; // Autowire PayPersonService

    @PostMapping("/add")
    public String add(@RequestBody RestCreateEmployee restCreateEmployee) {
        Employee employee = restCreateEmployee.toDomain();
        employeeService.saveEmployee(employee);

        // Migrate employees to PayPersons after adding a new employee
        payPersonService.migrateEmployeesToPayPersons();

        return "New employee added";
    }

    @GetMapping("/getAll")
    public List<RestEmployee> list(EmployeeFilterCriteria filterCriteria) {
        List<Employee> employees = employeeService.getAllEmployees(filterCriteria);
        return employees.stream().map(RestEmployee::fromDomain).collect(Collectors.toList());
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        return employeeService.deleteEmployeeById(id);
    }

    @GetMapping("/get/{id}")
    public RestEmployee getById(@PathVariable Long id) {
        Employee employee = employeeService.getEmployeeById(id);
        return employee != null ? RestEmployee.fromDomain(employee) : null;
    }

    @PutMapping("/update/{id}")
    public String update(@PathVariable Long id, @RequestBody RestCreateEmployee restCreateEmployee) {
        Employee updatedEmployee = restCreateEmployee.toDomain();
        String result = employeeService.updateEmployee(id.intValue(), updatedEmployee);

        // Migrate employees to PayPersons after updating an employee
        payPersonService.migrateEmployeesToPayPersons();

        return result;
    }
}
