package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.PayPerson;
import com.arjuncodes.studentsystem.service.PayPersonService;
import com.arjuncodes.studentsystem.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/payroll")
@CrossOrigin
public class PayrollController {

    @Autowired
    private PayPersonService payPersonService;

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/getAll")
    public ResponseEntity<List<PayPerson>> getAllPayPersons() {
        payPersonService.migrateEmployeesToPayPersons();
        List<PayPerson> payPersons = payPersonService.getAllPayPersons();
        return new ResponseEntity<>(payPersons, HttpStatus.OK);
    }

    @PostMapping("/migrate")
    public ResponseEntity<String> migrateEmployees() {
        try {
            payPersonService.migrateEmployeesToPayPersons();
            return new ResponseEntity<>("Employees migrated successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error migrating employees: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PayPerson> getPayPersonById(@PathVariable Long id) {
        PayPerson payPerson = payPersonService.getPayPersonById(id);
        return (payPerson != null) ? new ResponseEntity<>(payPerson, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/add")
    public ResponseEntity<PayPerson> addPayPerson(@RequestBody PayPerson payPerson) {
        PayPerson savedPayPerson = payPersonService.savePayPerson(payPerson);
        return new ResponseEntity<>(savedPayPerson, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PayPerson> updatePayPerson(@PathVariable Long id, @RequestBody PayPerson payPerson) {
        PayPerson updatedPayPerson = payPersonService.updatePayPerson(id, payPerson);
        return (updatedPayPerson != null) ? new ResponseEntity<>(updatedPayPerson, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePayPerson(@PathVariable Long id) {
        try {
            payPersonService.deletePayPerson(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}/grossSalary")
    public ResponseEntity<BigDecimal> getGrossSalary(@PathVariable Long id) {
        BigDecimal grossSalary = payPersonService.getGrossSalary(id);
        return new ResponseEntity<>(grossSalary, HttpStatus.OK);
    }

    @GetMapping("/{id}/netSalary")
    public ResponseEntity<BigDecimal> getNetSalary(@PathVariable Long id) {
        BigDecimal netSalary = payPersonService.getNetSalary(id);
        return new ResponseEntity<>(netSalary, HttpStatus.OK);
    }

    @GetMapping("/{id}/unpaidLeave")
    public ResponseEntity<Double> getUnpaidLeave(@PathVariable Long id) {
        double unpaidLeave = payPersonService.getUnpaidLeave(id);
        return new ResponseEntity<>(unpaidLeave, HttpStatus.OK);
    }
}
