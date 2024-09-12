package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.controller.criteria.EmployeeFilterCriteria;
import com.arjuncodes.studentsystem.model.Employee;
import com.arjuncodes.studentsystem.repository.EmployeeRepositoryz;
import com.arjuncodes.studentsystem.repository.entity.EmployeeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepositoryz employeeRepository;

    @Override
    public Employee saveEmployee(Employee employee) {
        EmployeeEntity employeeEntity = EmployeeEntity.fromDomain(employee);
        return employeeRepository.save(employeeEntity).toDomain();
    }

    @Override
    public List<Employee> getAllEmployees(EmployeeFilterCriteria filterCriteria) {
        Specification<EmployeeEntity> specification = new EmployeeSpecification(filterCriteria);
        return employeeRepository.findAll(specification).stream().map(EmployeeEntity::toDomain).collect(Collectors.toList());
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll().stream().map(EmployeeEntity::toDomain).collect(Collectors.toList());
    }

    @Override
    public String deleteEmployeeById(Long id) {
        Optional<EmployeeEntity> employeeEntityOptional = employeeRepository.findById(id);
        if (employeeEntityOptional.isPresent()) {
            employeeRepository.delete(employeeEntityOptional.get());
            return "Employee deleted successfully";
        } else {
            return "Employee not found";
        }
    }

    @Override
    public Employee getEmployeeById(Long id) {
        Optional<EmployeeEntity> employeeEntity = employeeRepository.findById(id);
        return employeeEntity.map(EmployeeEntity::toDomain).orElse(null);
    }

    @Override
    public String updateEmployee(int id, Employee employee) {
        Optional<EmployeeEntity> employeeEntityOptional = employeeRepository.findById((long) id);
        if (employeeEntityOptional.isPresent()) {
            EmployeeEntity employeeEntity = EmployeeEntity.fromDomain(employee);
            employeeEntity.setId((long) id);
            employeeRepository.save(employeeEntity);
            return "Employee updated successfully";
        } else {
            return "Employee not found";
        }
    }
}
