package com.sapo.edu.mapper.request;

import com.sapo.edu.entity.Customer;
import com.sapo.edu.payload.crudrequest.CustomerRequest;
import com.sapo.edu.repository.CustomerRepository;
import com.sapo.edu.repository.MotorbikeRepository;
import com.sapo.edu.service.CustomerService;
import com.sapo.edu.service.MotorbikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CustomerRequestMapper {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private MotorbikeRepository motorbikeRepository;
    @Autowired
    private MotorbikeService motorbikeService;
    @Autowired
    private CustomerService customerService;

    public Customer toCustomer(CustomerRequest customerRequest){
        Customer customer = new Customer();
        customer.setName(customerRequest.getName());
        customer.setAddress(customerRequest.getAddress());
        customer.setPhone(customerRequest.getPhone());

        return customer;
    }
}
