package com.sapo.edu.mapper.request;

import com.sapo.edu.common.RandomCodeGenerator;
import com.sapo.edu.common.ERole;
import com.sapo.edu.entity.Employee;
import com.sapo.edu.entity.Role;
import com.sapo.edu.exception.CustomValidationException;
import com.sapo.edu.exception.EntityNotFoundException;
import com.sapo.edu.payload.crudrequest.EmployeeRequest;
import com.sapo.edu.repository.EmployeeRepository;
import com.sapo.edu.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
public class EmployeeRequestMapper {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder encoder;


    public Employee toEmployee(EmployeeRequest employeeRequest) {
        Employee employee = new Employee();
        Set<String> strRoles = employeeRequest.getRoles();
        Set<Role> roles = new HashSet<>();
        String code;

        if (strRoles != null && strRoles.stream().anyMatch(Arrays.asList("admin", "moderator", "cashier")::contains)) {

            if (employeeRequest.getUsername() == null || employeeRequest.getPassword() == null)
                throw new CustomValidationException("Account is null when create employees with role: admin | moderator | cashier");

            strRoles.forEach(role -> {
                switch (role.toLowerCase()) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new EntityNotFoundException(Role.class, "role", ERole.ROLE_ADMIN.name()));
                        roles.add(adminRole);
                        break;

                    case "cashier":
                        Role cashierRole = roleRepository.findByName(ERole.ROLE_CASHIER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(cashierRole);
                        break;

                    case "moderator":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);
                        break;

                    // default is mechanic
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_MECHANIC)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                    }
                });

            // Create new user's account
            employee.setRoles(roles);
            employee.setUsername(employeeRequest.getUsername());
            employee.setPassword(encoder.encode(employeeRequest.getPassword())); // encrypt password
        }

        else {
            Role userRole = roleRepository.findByName(ERole.ROLE_MECHANIC)
                    .orElseThrow(() -> new EntityNotFoundException(Role.class, "role", ERole.ROLE_MECHANIC.name()));
            roles.add(userRole);
            employee.setRoles(roles);
        }


        do {
            code = RandomCodeGenerator.genCode("NV", 3, false, true);
        } while (employeeRepository.existsByCode(code));

        employee.setCode(code);
        employee.setName(employeeRequest.getName());
        employee.setPhone(employeeRequest.getPhone());
        employee.setAddress(employeeRequest.getAddress());
        employee.setWorkingStatus(employeeRequest.getWorkingStatus());

        return employee;
    }
}
