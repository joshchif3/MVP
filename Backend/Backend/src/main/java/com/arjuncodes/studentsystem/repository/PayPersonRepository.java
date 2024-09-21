package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.PayPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PayPersonRepository extends JpaRepository<PayPerson, Long> {
    PayPerson findByEmployeeId(Long employeeId);
    boolean existsByEmployeeId(Long employeeId);
}
