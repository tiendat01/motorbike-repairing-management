package com.sapo.edu.mapper.dto;

import com.sapo.edu.common.StatusConverter;
import com.sapo.edu.dto.TicketDTO;
import com.sapo.edu.entity.*;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Component
public class TicketDTOMapper {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private MotorbikeDTOMapper motorbikeDTOMapper;
    @Autowired
    private CustomerDTOMapper customerDTOMapper;
    @Autowired
    private EmployeeDTOMapper employeeDTOMapper;
    @Autowired
    private TicketServiceDTOMapper ticketServiceDTOMapper;
    @Autowired
    private TicketProductDTOMapper ticketProductDTOMapper;

    public TicketDTO toTicketDTO(Ticket ticket) {
        TypeMap<Ticket, TicketDTO> propertyMapper = modelMapper.getTypeMap(Ticket.class, TicketDTO.class) == null ?
                modelMapper.createTypeMap(Ticket.class, TicketDTO.class) :
                modelMapper.getTypeMap(Ticket.class, TicketDTO.class);

//        DecimalFormat df = new DecimalFormat("#,###.00");
//        df.setDecimalFormatSymbols(new DecimalFormatSymbols(Locale.getDefault()));

        Converter<Byte, String> statusConverter = context -> {
            Byte status = context.getSource();
            return StatusConverter.toStatusString(status);
        };

        propertyMapper.addMappings(mapper -> {
            mapper.using(statusConverter).map(Ticket::getStatus, TicketDTO::setStatus);
            mapper.using(context -> motorbikeDTOMapper.toMotorbikeDTO((Motorbike) context.getSource()))
                    .map(Ticket::getMotorbike, TicketDTO::setMotorbike);
            mapper.using(context -> context.getSource() == null ? null : customerDTOMapper.toCustomerDTO((Customer) context.getSource()))
                    .map(Ticket::getCustomer, TicketDTO::setCustomer);
            mapper.using(context -> context.getSource() == null ? null : employeeDTOMapper.toEmployeeDTO((Employee) context.getSource()))
                    .map(Ticket::getRepairingEmployee, TicketDTO::setRepairingEmployee);

//            mapper.using(context -> context.getSource() == null ? null : (new DecimalFormat("#,###")).format(((BigDecimal)context.getSource()))) // using converter
//                    .map(Ticket::getDiscount, TicketDTO::setDiscount);
//            mapper.using(context -> context.getSource() == null ? null : df.format(((BigDecimal)context.getSource()))) // using converter
//                    .map(Ticket::getTotalPrice, TicketDTO::setTotalPrice);
//            mapper.using(context -> ticketProductDTOMapper.toTicketProductDTOs((Set<TicketProduct>) context.getSource())) // cannot convert PersistentSet to Set ???
//                    .map(Ticket::getTicketsProducts, TicketDTO::setProducts);
//            mapper.using(context -> ticketServiceDTOMapper.toTicketServiceDTOs((Set<TicketService>) context.getSource()))
//                    .map(Ticket::getTicketsServices, TicketDTO::setServices);
        });

        TicketDTO res = this.modelMapper.map(ticket, TicketDTO.class); // print null??
        // map by "rice/hand"
        if (ticket.getTicketsProducts() != null)
            res.setProducts(ticketProductDTOMapper.toTicketProductDTOs(ticket.getTicketsProducts()));
        if (ticket.getTicketsServices() != null)
            res.setServices(ticketServiceDTOMapper.toTicketServiceDTOs(ticket.getTicketsServices()));

        return res;

    }

    public List<TicketDTO> toTicketDTOs(List<Ticket> tickets) {
        return tickets.stream().map(this::toTicketDTO).collect(Collectors.toList());
    }
}
