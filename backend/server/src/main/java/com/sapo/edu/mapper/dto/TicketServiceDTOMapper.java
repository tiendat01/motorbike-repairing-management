package com.sapo.edu.mapper.dto;

import com.sapo.edu.dto.connectDTO.TicketServiceDTO;
import com.sapo.edu.entity.Service;
import com.sapo.edu.entity.connectentity.TicketService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.DecimalFormat;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class TicketServiceDTOMapper {
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private ServiceDTOMapper serviceDTOMapper;

    public TicketServiceDTO toTicketServiceDTO(TicketService ticketService) {
        TypeMap<TicketService, TicketServiceDTO> propertyMapper =
                this.mapper.getTypeMap(TicketService.class, TicketServiceDTO.class) == null ?
                        this.mapper.createTypeMap(TicketService.class, TicketServiceDTO.class) :
                        this.mapper.getTypeMap(TicketService.class, TicketServiceDTO.class);
        propertyMapper.addMapping(TicketService::getPrice, TicketServiceDTO::setStockPrice)
                .addMappings(mapper -> {
                    mapper.using(context -> serviceDTOMapper.toServiceDTO((Service) context.getSource()))
                            .map(TicketService::getService, TicketServiceDTO::setService);
                    mapper.map(TicketService::getPrice, TicketServiceDTO::setStockPrice);
                });
        return this.mapper.map(ticketService, TicketServiceDTO.class);
    }

    public Set<TicketServiceDTO> toTicketServiceDTOs(Set<TicketService> ticketServices) {
        return ticketServices.stream()
                .map(this::toTicketServiceDTO)
                .collect(Collectors.toSet());
    }

}
