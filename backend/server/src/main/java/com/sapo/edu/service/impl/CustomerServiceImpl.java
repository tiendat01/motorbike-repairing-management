package com.sapo.edu.service.impl;

import com.sapo.edu.entity.Customer;
import com.sapo.edu.entity.Motorbike;
import com.sapo.edu.entity.Ticket;
import com.sapo.edu.exception.DuplicateEntityException;
import com.sapo.edu.exception.EntityNotFoundException;
import com.sapo.edu.mapper.dto.CustomerDTOMapper;
import com.sapo.edu.payload.crudrequest.CustomerRequest;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.repository.CustomerRepository;
import com.sapo.edu.repository.MotorbikeRepository;
import com.sapo.edu.repository.TicketRepository;
import com.sapo.edu.repository.dao.CustomerDAO;
import com.sapo.edu.service.CustomerService;
import com.sapo.edu.service.base.impl.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl extends BaseServiceImpl<Customer> implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private CustomerDTOMapper dtoMapper;
    @Autowired
    private MotorbikeRepository motorbikeRepository;
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private CustomerDAO customerDAO;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        super(customerRepository);
    }

    // READ:
    @Override
    public List<Customer> findAll() {
        return super.findAll().stream().filter((item -> item.getActive())).collect(Collectors.toList());
    }
    @Override
    public Customer findById(Long id) {
        Customer customer = super.findById(id);
        if (!customer.getActive())
            throw new EntityNotFoundException(Customer.class, "Customer", id.toString());
        return customer;
    }
    @Override
    public Map<String, Object> findAllPaging(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Customer> itemsPerPage = customerRepository.findByActive(true, pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("currentPage", itemsPerPage.getNumber());
        response.put("totalPages", itemsPerPage.getTotalPages());
        response.put("totalItems", itemsPerPage.getTotalElements());
        response.put("listOfItems", dtoMapper.toCustomerDTOs(itemsPerPage.getContent()));

        return response;
    }


    // READ
    @Override
    @Transactional
    public Customer save(Customer newEntity) {
        if (customerRepository.existsByPhone(newEntity.getPhone()))
            throw new DuplicateEntityException(CustomerRequest.class, "phone", newEntity.getPhone());

        newEntity.setCreatedDate(LocalDateTime.now());
        newEntity.setUpdatedDate(LocalDateTime.now());
        newEntity.setActive(true);
        return super.save(newEntity);
    }

    @Override
    @Transactional
    public Customer updateById(Long id, Customer newEntity) {
        Customer oldEntity = this.findById(id);
        // this field cannot update
        newEntity.setId(oldEntity.getId());
        newEntity.setCreatedDate(oldEntity.getCreatedDate());

        if (customerRepository.existsByPhone(newEntity.getPhone())) {
            Customer existed = customerRepository.findByPhone(newEntity.getPhone()).get();
            if (!existed.getId().equals(newEntity.getId()))
                throw new DuplicateEntityException(CustomerRequest.class, "phone", newEntity.getPhone());
        }

        newEntity.setUpdatedDate(LocalDateTime.now());
        newEntity.setActive(true);

        return customerRepository.save(newEntity);
    }


    // DELETE
    @Override
    @Transactional
    public void deleteById(Long id) {
        Customer customer = this.findById(id);
        // For relation ManyToMany customers - motorbikes:
        // customer is reference part, motorbike is owning part (depending on declare @ManyToMany in entity)
        // ===> When remove owning part => Hibernate will remove all its association
        // But with reference part, Hibernate do not !
        // Yourself need to delete all associations first
        for (Motorbike m : customer.getMotorbikes())
            customer.removeMotorbike(m);

        // delete association first, avoid constraint foreign key with other object
        List<Ticket> customersInTicket = ticketRepository.findByCustomer(customer);
        for (var ticket : customersInTicket) {
            ticket.setCustomer(null);
            ticketRepository.save(ticket); // update
        }
        customerRepository.deleteById(id);
    }


    @Override
    @Transactional
    public void deleteByIdTmp(Long customerId) {
        Customer customer = this.findById(customerId);
        customer.setActive(false);
        customer.setPhone(customer.getId().toString()); // after tmp delete, unique field phone should be actually 'unique'
        customer.setUpdatedDate(LocalDateTime.now());
        customerRepository.save(customer);
    }
    @Override
    @Transactional
    public void deleteByIdArrayTmp(List<Long> customerIds) {
        customerIds.stream().forEach((customerId -> this.deleteByIdTmp(customerId)));
    }



    // Many-to-Many relationship (bonus)
    @Override
    public List<Motorbike> getAllMotorbikesByCustomersId(Long customerId) {
        if (!customerRepository.existsById(customerId))
            throw new EntityNotFoundException(Customer.class, "customerId", customerId.toString());
        List<Motorbike> motorbikes = motorbikeRepository.findMotorbikesByCustomersId(customerId);
        return motorbikes;
    }
    @Override
    @Transactional
    public void deleteMotorbikeFromCustomer(Long motorbikeId, Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new EntityNotFoundException(Customer.class, "customerId", customerId.toString()));
        if (!motorbikeRepository.existsById(motorbikeId))
            throw new EntityNotFoundException(Motorbike.class, "motorbikeId", motorbikeId.toString());
        customer.removeMotorbike(motorbikeId);
        customerRepository.save(customer);
    }
    @Override
    @Transactional
    public Motorbike addMotorbikeToCustomer(Long motorbikeId, Long customerId) {
        Motorbike motorbike = customerRepository.findById(customerId)
                .map(customer -> {
                    Motorbike _motorbike = motorbikeRepository.findById(motorbikeId)
                            .orElseThrow(() -> new EntityNotFoundException(Motorbike.class, "motorbikeId", motorbikeId.toString()));

                    customer.addMotorbike(_motorbike);
                    customerRepository.save(customer);
                    return _motorbike;
                }).orElseThrow(() -> new EntityNotFoundException(Customer.class, "customerId", customerId.toString()));
        return motorbike;
    }


    // FILTER
    @Override
    public List<Customer> searchCustomer(List<SearchCriteria> params) {
        return customerDAO.searchCustomer(params);
    }


    // BONUS
    @Override
    public List<Ticket> findAllTicket(Long customerId) {
        return ticketRepository.findByCustomer(this.findById(customerId));
    }
}
