package com.sapo.edu.service;

import com.sapo.edu.entity.Customer;
import com.sapo.edu.entity.Model;
import com.sapo.edu.entity.Motorbike;
import com.sapo.edu.entity.Ticket;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.service.base.BaseService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

public interface CustomerService extends BaseService<Customer> {
    @Transactional
    void deleteByIdTmp(Long customerId);

    @Transactional
    void deleteByIdArrayTmp(List<Long> customerIds);

    public List<Motorbike> getAllMotorbikesByCustomersId(Long customerId);
    public void deleteMotorbikeFromCustomer(Long motorbikeId, Long customerId);
    public Motorbike addMotorbikeToCustomer(Long motorbikeId, Long customerId);

    List<Customer> searchCustomer(List<SearchCriteria> params);

    List<Ticket> findAllTicket(Long customerId);
}
