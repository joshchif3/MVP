package com.arjuncodes.studentsystem.service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public interface CustomPredicates {

    default Predicate likePredicate(CriteriaBuilder builder, Root<?> root, String field, String value) {
        if (isValid(value)) {
            return builder.like(root.get(field), "%" + value + "%");
        }

        return null;
    }

    default Predicate greaterThanPredicate(CriteriaBuilder builder, Root<?> root, String field, Integer value) {
        if (isValid(value)) {
            return builder.greaterThan(root.get(field), value);
        }

        return null;
    }

    default Predicate greaterThanPredicate(CriteriaBuilder builder, Root<?> root, String field, Double value) {
        if (isValid(value)) {
            return builder.greaterThan(root.get(field), value);
        }

        return null;
    }

    default Predicate equalPredicate(CriteriaBuilder builder, Root<?> root, String field, String value) {
        if (isValid(value)) {
            return builder.equal(root.get(field), value);
        }

        return null;
    }

    default Predicate equalPredicate(CriteriaBuilder builder, Root<?> root, String field, Integer value) {
        if (isValid(value)) {
            return builder.equal(root.get(field), value);
        }

        return null;
    }

    default Predicate equalPredicate(CriteriaBuilder builder, Root<?> root, String field, Double value) {
        if (isValid(value)) {
            return builder.equal(root.get(field), value);
        }

        return null;
    }


    private boolean isValid(Object object) {
        return (isNotNull(object) && isNotBlank(object));
    }

    private boolean isNotNull(Object object) {
        return object != null;
    }

    private boolean isNotBlank(Object object) {
        return !object.equals("");
    }
}
