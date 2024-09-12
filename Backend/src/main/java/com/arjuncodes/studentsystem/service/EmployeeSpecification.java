package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.controller.criteria.EmployeeFilterCriteria;
import com.arjuncodes.studentsystem.repository.entity.EmployeeEntity;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class EmployeeSpecification implements Specification<EmployeeEntity>, CustomPredicates {
    private EmployeeFilterCriteria filterCriteria;

    public EmployeeSpecification(EmployeeFilterCriteria filterCriteria) {
        this.filterCriteria = filterCriteria;
    }


    @Override
    public Predicate toPredicate(Root<EmployeeEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder builder) {
        List<Predicate> predicates = new ArrayList<Predicate>();

        predicates.add(equalPredicate(builder, root, "name", filterCriteria.getName()));
        predicates.add(equalPredicate(builder, root, "surname", filterCriteria.getSurname()));
        predicates.add(equalPredicate(builder, root, "company", filterCriteria.getCompany()));



        return builder.and(predicates.stream()
                .filter(Objects::nonNull)
                .toArray(Predicate[]::new));
    }
}
