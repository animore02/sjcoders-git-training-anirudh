package com.sjcoders.training.service;

import com.sjcoders.training.model.Employee;
import com.sjcoders.training.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public List<Employee> searchEmployees(String query) {
        return employeeRepository
                .findByFullNameContainingIgnoreCaseOrEmployeeCodeContainingIgnoreCase(
                        query, query);
    }

    // UPDATE
    public Optional<Employee> updateEmployee(Long id, Employee employee) {

        return employeeRepository.findById(id)
                .map(existingEmployee -> {

                    existingEmployee.setEmployeeCode(
                            employee.getEmployeeCode()
                    );

                    existingEmployee.setFullName(
                            employee.getFullName()
                    );

                    existingEmployee.setEmail(
                            employee.getEmail()
                    );

                    existingEmployee.setPhone(
                            employee.getPhone()
                    );

                    existingEmployee.setDepartment(
                            employee.getDepartment()
                    );

                    existingEmployee.setRole(
                            employee.getRole()
                    );

                    existingEmployee.setStatus(
                            employee.getStatus()
                    );

                    return employeeRepository.save(existingEmployee);
                });
    }

    // DELETE
    public boolean deleteEmployee(Long id) {

        if (!employeeRepository.existsById(id)) {
            return false;
        }

        employeeRepository.deleteById(id);
        return true;
    }
}