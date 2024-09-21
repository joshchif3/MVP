package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.PayPerson;
import com.arjuncodes.studentsystem.repository.PayPersonRepository;
import com.arjuncodes.studentsystem.service.LeaveDaysService;
import com.arjuncodes.studentsystem.service.PayPersonService;
import com.arjuncodes.studentsystem.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/payroll")
@CrossOrigin
public class PayrollController {

    @Autowired
    private PayPersonService payPersonService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private LeaveDaysService leaveDaysService;

    @Autowired
    private PayPersonRepository payPersonRepository; // Ensure this is autowired

    @GetMapping("/getAll")
    public ResponseEntity<List<PayPerson>> getAllPayPersons() {
        try {
            // Migrate employees to PayPerson records
            payPersonService.migrateEmployeesToPayPersons();

            // Retrieve all PayPerson records
            List<PayPerson> payPersons = payPersonService.getAllPayPersons();

            // Calculate final pay for each PayPerson
            payPersons.forEach(payPerson -> {
                payPersonService.calculateFinalPay(payPerson);
            });

            // Update each PayPerson with new details
            payPersons.forEach(payPerson -> {
                // Here you might need to update with specific logic
                // Example: save updated PayPerson records
                payPersonService.updatePayPerson(payPerson.getId(), payPerson);
            });

            return new ResponseEntity<>(payPersons, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
    public ResponseEntity<String> addPayPerson(@RequestBody PayPerson payPerson) {
        try {
            PayPerson savedPayPerson = payPersonService.savePayPerson(payPerson);
            return new ResponseEntity<>("PayPerson added successfully with ID: " + savedPayPerson.getId(), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding PayPerson: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PayPerson> updatePayPerson(@PathVariable Long id, @RequestBody PayPerson payPerson) {
        try {
            // Fetch the existing PayPerson
            PayPerson existingPayPerson = payPersonService.getPayPersonById(id);
            if (existingPayPerson == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            // Update the PayPerson with new details
            PayPerson updatedPayPerson = payPersonService.updatePayPerson(id, payPerson);

            if (updatedPayPerson != null) {
                // Calculate and save leave days
                leaveDaysService.calculateAndSaveLeaveDays(updatedPayPerson);

                // Update leave payment status if needed
                if (payPerson.getLeaveStartDate() != null && payPerson.getLeaveEndDate() != null) {
                    leaveDaysService.updateLeavePaymentStatus(updatedPayPerson, payPerson.isLeavePaid());
                }

                // Recalculate leave days for year and month
                leaveDaysService.calculateLeaveDaysForYear(updatedPayPerson);
                leaveDaysService.calculateLeaveDaysForMonth(updatedPayPerson);

                // Recalculate final pay
                payPersonService.calculateFinalPay(updatedPayPerson);

                // Save changes
                payPersonRepository.save(updatedPayPerson);
            }

            return new ResponseEntity<>(updatedPayPerson, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

    @PostMapping("/{id}/updateLeave")
    public ResponseEntity<Void> updateLeave(
            @PathVariable Long id,
            @RequestParam LocalDate leaveStartDate,
            @RequestParam LocalDate leaveEndDate,
            @RequestParam boolean isPaid) {
        try {
            PayPerson payPerson = payPersonService.getPayPersonById(id);
            if (payPerson == null) {
                return ResponseEntity.notFound().build();
            }

            payPerson.setLeaveStartDate(leaveStartDate);
            payPerson.setLeaveEndDate(leaveEndDate);
            leaveDaysService.calculateAndSaveLeaveDays(payPerson);
            leaveDaysService.updateLeavePaymentStatus(payPerson, isPaid);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    
    @GetMapping("/{id}/leaveDaysForYear")
    public ResponseEntity<Double> getLeaveDaysForYear(@PathVariable Long id) {
        try {
            PayPerson payPerson = payPersonService.getPayPersonById(id);
            if (payPerson == null) {
                return ResponseEntity.notFound().build();
            }

            double leaveDaysForYear = leaveDaysService.calculateLeaveDaysForYear(payPerson);
            return ResponseEntity.ok(leaveDaysForYear);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}/leaveDaysForMonth")
    public ResponseEntity<Double> getLeaveDaysForMonth(@PathVariable Long id) {
        try {
            PayPerson payPerson = payPersonService.getPayPersonById(id);
            if (payPerson == null) {
                return ResponseEntity.notFound().build();
            }

            double leaveDaysForMonth = leaveDaysService.calculateLeaveDaysForMonth(payPerson);
            return ResponseEntity.ok(leaveDaysForMonth);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/leaveDaysPerMonth")
    public ResponseEntity<Double> getLeaveDaysPerMonth() {
        try {
            double leaveDaysPerMonth = leaveDaysService.calculateLeaveDaysPerMonth();
            return ResponseEntity.ok(leaveDaysPerMonth);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/payoutForLeave")
    public ResponseEntity<Double> getPayoutForLeave(
            @RequestParam Double salary,
            @RequestParam Integer leaveDaysToPayOut) {
        try {
            double payout = leaveDaysService.calculatePayoutForLeaveDays(salary, leaveDaysToPayOut);
            return ResponseEntity.ok(payout);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
