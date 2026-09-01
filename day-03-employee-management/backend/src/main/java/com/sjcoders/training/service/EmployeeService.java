package com.sjcoders.training.service;

import com.sjcoders.training.dto.EmployeeRequest;
import com.sjcoders.training.dto.EmployeeResponse;
import com.sjcoders.training.exception.ResourceNotFoundException;
import com.sjcoders.training.model.Employee;
import com.sjcoders.training.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public EmployeeResponse createEmployee(EmployeeRequest request) {
        Employee employee = new Employee();
        applyRequest(employee, request);
        return mapToResponse(employeeRepository.save(employee));
    }

    public List<EmployeeResponse> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public EmployeeResponse getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Employee not found with id: " + id));
        return mapToResponse(employee);
    }

    public List<EmployeeResponse> searchEmployees(String query) {
        return employeeRepository
                .findByFullNameContainingIgnoreCaseOrEmployeeCodeContainingIgnoreCase(
                        query, query)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Employee not found with id: " + id));
        applyRequest(employee, request);
        return mapToResponse(employeeRepository.save(employee));
    }

    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private void applyRequest(Employee employee, EmployeeRequest request) {
        employee.setEmployeeCode(request.getEmployeeCode());
        employee.setFullName(request.getFullName());
        employee.setEmail(request.getEmail());
        employee.setPhone(request.getPhone());
        employee.setDepartment(request.getDepartment());
        employee.setRole(request.getRole());
        employee.setStatus(request.getStatus());
    }

    private EmployeeResponse mapToResponse(Employee employee) {
        return new EmployeeResponse(
                employee.getId(),
                employee.getEmployeeCode(),
                employee.getFullName(),
                employee.getEmail(),
                employee.getPhone(),
                employee.getDepartment(),
                employee.getRole(),
                employee.getStatus()
        );
    }
}