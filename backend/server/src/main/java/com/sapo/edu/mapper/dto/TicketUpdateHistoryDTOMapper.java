package com.sapo.edu.mapper.dto;

import com.sapo.edu.common.StatusConverter;
import com.sapo.edu.dto.TicketUpdateHistoryDTO;
import com.sapo.edu.entity.TicketUpdateHistory;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TicketUpdateHistoryDTOMapper {
    @Autowired
    private ModelMapper mapper;

    public TicketUpdateHistoryDTO toTicketUpdateHistoryDTO(TicketUpdateHistory ticketUpdateHistory) {
        TypeMap<TicketUpdateHistory, TicketUpdateHistoryDTO> propertyMapper =
                mapper.getTypeMap(TicketUpdateHistory.class, TicketUpdateHistoryDTO.class) == null ?
                        mapper.createTypeMap(TicketUpdateHistory.class, TicketUpdateHistoryDTO.class) :
                        mapper.getTypeMap(TicketUpdateHistory.class, TicketUpdateHistoryDTO.class);

        Converter<Byte, String> statusConverter = context -> {
            Byte status = context.getSource();
            return StatusConverter.toStatusString(status);
        };

        propertyMapper.addMappings(mapper -> {
            mapper.using(statusConverter)
                    .map(TicketUpdateHistory::getOldStatus, TicketUpdateHistoryDTO::setOldStatus);
            mapper.using(statusConverter)
                    .map(TicketUpdateHistory::getNewStatus, TicketUpdateHistoryDTO::setNewStatus);
            mapper.map(src -> src.getUpdatedBy().getName(), TicketUpdateHistoryDTO::setUpdatedBy);
            mapper.map(src -> src.getTicket().getId(), TicketUpdateHistoryDTO::setTicketId);
            mapper.map(src -> src.getTicket().getCode(), TicketUpdateHistoryDTO::setTicketCode);
        });

        return this.mapper.map(ticketUpdateHistory, TicketUpdateHistoryDTO.class);
    }

    public List<TicketUpdateHistoryDTO> toTicketUpdateHistoryDTOs(List<TicketUpdateHistory> ticketUpdateHistories) {
        return ticketUpdateHistories.stream()
                .map(ticketUpdateHistory -> this.toTicketUpdateHistoryDTO(ticketUpdateHistory))
                .collect(Collectors.toList());
    }
}
