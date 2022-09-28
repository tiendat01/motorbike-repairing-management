package com.sapo.edu.service.impl;

import com.sapo.edu.entity.Employee;
import com.sapo.edu.entity.Ticket;
import com.sapo.edu.exception.DuplicateEntityException;
import com.sapo.edu.exception.EntityNotFoundException;
import com.sapo.edu.mapper.dto.EmployeeDTOMapper;
import com.sapo.edu.payload.crudrequest.EmployeeRequest;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.repository.EmployeeRepository;
import com.sapo.edu.repository.TicketRepository;
import com.sapo.edu.repository.dao.EmployeeDAO;
import com.sapo.edu.service.EmployeeService;
import com.sapo.edu.service.base.impl.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl extends BaseServiceImpl<Employee> implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private EmployeeDTOMapper dtoMapper;
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private EmployeeDAO employeeDAO;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        super(employeeRepository);
    }

    // READ
    @Override
    public List<Employee> findAll() {
        return super.findAll().stream().filter((item -> item.getActive())).collect(Collectors.toList());
    }
    @Override
    public Employee findById(Long id) {
        Employee employee = super.findById(id);
        if (!employee.getActive())
            throw new EntityNotFoundException(Employee.class, "ID", id.toString());
        return employee;
    }
    @Override
    public Map<String, Object> findAllPaging(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Employee> itemsPerPage = employeeRepository.findByActive(true, pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("currentPage", itemsPerPage.getNumber());
        response.put("totalPages", itemsPerPage.getTotalPages());
        response.put("totalItems", itemsPerPage.getTotalElements());
        response.put("listOfItems", dtoMapper.toEmployeeDTOs(itemsPerPage.getContent()));

        return response;
    }

    // CREATE
    @Override
    @Transactional
    public Employee save(Employee newEntity) {
        if (employeeRepository.existsByPhone(newEntity.getPhone()))
            throw new DuplicateEntityException(EmployeeRequest.class, "phone", newEntity.getPhone());
        if (newEntity.getUsername() != null && employeeRepository.existsByUsername(newEntity.getUsername()))
            throw new DuplicateEntityException(EmployeeRequest.class, "username", newEntity.getUsername());

        newEntity.setAvailable(true);
        newEntity.setWorkingStatus(true);
        newEntity.setCreatedDate(LocalDateTime.now());
        newEntity.setUpdatedDate(LocalDateTime.now());
        newEntity.setActive(true);
        return super.save(newEntity);
    }

    // UPDATE
    @Override
    @Transactional
    public Employee updateById(Long id, Employee newEntity) {
        Employee oldEntity = this.findById(id);

        if (oldEntity.getUsername() != null && oldEntity.getUsername().equals("superuser")) {
            throw new AccessDeniedException("You cannot update superuser");
        }

        // this field cannot update
        newEntity.setId(oldEntity.getId());
        newEntity.setCode(oldEntity.getCode());
        newEntity.setRoles(oldEntity.getRoles());
        newEntity.setUsername(oldEntity.getUsername());
        newEntity.setPassword(oldEntity.getPassword());
        newEntity.setCreatedDate(oldEntity.getCreatedDate());
        newEntity.setAvailable(oldEntity.getAvailable()); // apply only to mechanic

        if (employeeRepository.existsByPhone(newEntity.getPhone())) {
            Employee existed = employeeRepository.findByPhone(newEntity.getPhone()).get();
            if (!existed.getId().equals(newEntity.getId()))
                throw new DuplicateEntityException(EmployeeRequest.class, "phone", newEntity.getPhone());
        }

        if (newEntity.getWorkingStatus() == null)
            newEntity.setWorkingStatus(oldEntity.getWorkingStatus());

        newEntity.setUpdatedDate(LocalDateTime.now());
        newEntity.setActive(true);

        return employeeRepository.save(newEntity);
    }

    // DELETE
    @Override
    @Transactional
    public void deleteById(Long id) {

        Optional<Employee> optional = Optional.ofNullable(this.findById(id));
        optional.map(entity -> {
            if (entity.getUsername() == null) {
                // delete association first, avoid constraint foreign key with other object
                deleteAssociationOneToMany(id);
                employeeRepository.deleteById(id);
                return id;
            }
            if (!entity.getUsername().equals("superuser")) {
                // delete association first, avoid constraint foreign key with other object
                deleteAssociationOneToMany(id);
                employeeRepository.deleteById(id);
                return id;
            }
            throw new AccessDeniedException("You cannot delete superuser");
                })
                .orElseThrow(() -> new EntityNotFoundException(EmployeeRequest.class, "id", id.toString()));
    }
    private void deleteAssociationOneToMany(Long employeeId) {
        Employee repairingEmployee = this.findById(employeeId);
        List<Ticket> ticketsByThisEmployee = ticketRepository.findByRepairingEmployee(repairingEmployee);
        for (var ticket : ticketsByThisEmployee) {
            ticket.setRepairingEmployee(null);
            ticketRepository.save(ticket); // update
        }
    }



    @Override
    @Transactional
    public void deleteByIdTmp(Long employeeId) {
        Employee employee = this.findById(employeeId);
        if (employee.getUsername() != null && employee.getUsername().equalsIgnoreCase("superuser"))
            throw new AccessDeniedException("You cannot delete superuser");
        employee.setActive(false);
        employee.setPhone(employee.getCode()); // after tmp delete, unique field phone should be actually 'unique'
        employee.setUpdatedDate(LocalDateTime.now());
        employeeRepository.save(employee);
    }
    @Override
    @Transactional
    public void deleteByIdArrayTmp(List<Long> employeeIds) {
        employeeIds.stream().forEach((employeeId) -> this.deleteByIdTmp(employeeId));
    }


    // FILTER:
    @Override
    public List<Employee> searchEmployee(List<SearchCriteria> params) {
        return employeeDAO.searchEmployee(params);
    }

    // BONUS:
    @Override
    public List<Ticket> findAllTicket(Long repairingEmployeeId) {
        return ticketRepository.findByRepairingEmployee(this.findById(repairingEmployeeId));
    }


    @Override
    public boolean updatePassword(String username, String oldPassword, String password, String dbHashedPassword) {
        Employee employee = employeeRepository.findByUsername(username).get();
        // dbHashedPassword == employee.getPassword() ???
        if (passwordEncoder.matches(oldPassword, dbHashedPassword)) {
            employee.setPassword(passwordEncoder.encode(password));
            employeeRepository.save(employee);
            return true;
        }
        else
            return false;
    }
}
