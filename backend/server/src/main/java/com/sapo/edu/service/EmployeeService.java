package com.sapo.edu.service;

import com.sapo.edu.entity.Employee;
import com.sapo.edu.entity.Role;
import com.sapo.edu.entity.Ticket;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.service.base.BaseService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

public interface EmployeeService extends BaseService<Employee> {
    @Transactional
    void deleteByIdTmp(Long employeeId);

    @Transactional
    void deleteByIdArrayTmp(List<Long> employeeIds);

    List<Employee> searchEmployee(List<SearchCriteria> params);

    List<Ticket> findAllTicket(Long repairingEmployeeId);

    boolean updatePassword(String username, String oldPassword, String password, String dbHashedPassword);
}
