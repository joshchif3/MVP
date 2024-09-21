package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.service.PayPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/taxNpay")
@CrossOrigin
public class TaxNpayController {

    @Autowired
    private PayPersonService payPersonService;

    @GetMapping("/taxCalculator")
    public ResponseEntity<Double> calculateTax(@RequestParam double salary) {
        try {
            BigDecimal salaryBigDecimal = BigDecimal.valueOf(salary);
            double tax = payPersonService.calculateTax(salaryBigDecimal).doubleValue();
            return ResponseEntity.ok(tax);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/uif")
    public ResponseEntity<Double> calculateUIF(@RequestParam double salary) {
        try {
            BigDecimal salaryBigDecimal = BigDecimal.valueOf(salary);
            double uif = payPersonService.calculateUIF(salaryBigDecimal).doubleValue();
            return ResponseEntity.ok(uif);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/grossSalary/{id}")
    public ResponseEntity<BigDecimal> getGrossSalary(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(payPersonService.getGrossSalary(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/netSalary/{id}")
    public ResponseEntity<BigDecimal> getNetSalary(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(payPersonService.getNetSalary(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/unpaidLeave/{id}")
    public ResponseEntity<Double> getUnpaidLeave(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(payPersonService.getUnpaidLeave(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
