package com.sapo.edu.mapper.request;

import com.sapo.edu.common.RandomCodeGenerator;
import com.sapo.edu.entity.Customer;
import com.sapo.edu.entity.Employee;
import com.sapo.edu.entity.Motorbike;
import com.sapo.edu.entity.Ticket;
import com.sapo.edu.exception.EntityNotFoundException;
import com.sapo.edu.payload.crudrequest.TicketRequest;
import com.sapo.edu.repository.CustomerRepository;
import com.sapo.edu.repository.EmployeeRepository;
import com.sapo.edu.repository.MotorbikeRepository;
import com.sapo.edu.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TicketRequestMapper {
    @Autowired
    private MotorbikeRepository motorbikeRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private TicketRepository ticketRepository;

    public Ticket toNewTicket(TicketRequest ticketRequest) {
        Ticket ticket = new Ticket();

        Motorbike motorbike = null;
        Customer customer = null;
        Employee repairingEmployee = null;
        String code;

        motorbike = motorbikeRepository.findById(ticketRequest.getMotorbikeId())
                .orElseThrow(() -> new EntityNotFoundException(Motorbike.class, "motorbikeId", ticketRequest.getMotorbikeId().toString()));
        if (ticketRequest.getCustomerId() != null) {
            customer = customerRepository.findById(ticketRequest.getCustomerId())
                    .orElseThrow(() -> new EntityNotFoundException(Customer.class, "customerId", ticketRequest.getCustomerId().toString()));
        }
        if (ticketRequest.getRepairingEmployeeId() != null) {
            repairingEmployee = employeeRepository.findById(ticketRequest.getRepairingEmployeeId())
                    .orElseThrow(() -> new EntityNotFoundException(Employee.class, "repairingEmployeeId", ticketRequest.getRepairingEmployeeId().toString()));
        }

        do {
            code = RandomCodeGenerator.genCode("HD", 5,false, true);
        } while (ticketRepository.existsByCode(code));

        ticket.setCode(code);

        ticket.setCustomer(customer);
        ticket.setMotorbike(motorbike);
        ticket.setRepairingEmployee(repairingEmployee);

        ticket.setNote(ticketRequest.getNote());
        ticket.setDescription(ticketRequest.getDescription());
        ticket.setStatus(ticketRequest.getStatus());

        ticket.setDiscount(ticketRequest.getDiscount());
        ticket.setAppointmentDate(ticketRequest.getAppointmentDate());
        ticket.setPaymentMethod(ticketRequest.getPaymentMethod());

        // not enough field for Ticket object: Set<TicketService>, Set<TicketProduct>, BigDecimal totalPrice

        return ticket;
    }
}
