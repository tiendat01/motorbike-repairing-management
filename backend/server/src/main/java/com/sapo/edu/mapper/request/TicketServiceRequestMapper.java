package com.sapo.edu.mapper.request;

import com.sapo.edu.entity.Service;
import com.sapo.edu.entity.connectentity.TicketService;
import com.sapo.edu.exception.EntityNotFoundException;
import com.sapo.edu.payload.connectrequest.TicketServiceRequest;
import com.sapo.edu.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TicketServiceRequestMapper {
    @Autowired
    private ServiceRepository serviceRepository;
    public TicketService toTicketService(TicketServiceRequest request) {
        TicketService ticketService = new TicketService();
        Service service = serviceRepository.findById(request.getServiceId())
                        .orElseThrow(() -> new EntityNotFoundException(Service.class, "serviceId", request.getServiceId().toString()));

        ticketService.setService(service);
        ticketService.setPrice(service.getPrice());
        // incomplete TicketService: setId(TicketServiceId) and setTicket (because don't have new Ticket yet)

        return ticketService;
    }
}
