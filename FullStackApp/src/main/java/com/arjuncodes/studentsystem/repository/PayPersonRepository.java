package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.PayPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

public interface PayPersonRepository extends JpaRepository<PayPerson, Long> {
    boolean existsByNameAndSurnameAndCompany(String name, String surname, String company);
}

