package com.sapo.edu.service.impl;

import com.sapo.edu.entity.Ticket;
import com.sapo.edu.entity.TicketUpdateHistory;
import com.sapo.edu.exception.EntityNotFoundException;
import com.sapo.edu.repository.TicketRepository;
import com.sapo.edu.repository.TicketUpdateHistoryRepository;
import com.sapo.edu.service.TicketUpdateHistoryService;
import com.sapo.edu.service.base.impl.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketUpdateHistoryServiceImpl extends BaseServiceImpl<TicketUpdateHistory> implements TicketUpdateHistoryService {
    protected TicketUpdateHistoryServiceImpl(TicketUpdateHistoryRepository ticketUpdateHistoryRepository) {
        super(ticketUpdateHistoryRepository);
    }

    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private TicketUpdateHistoryRepository repository;

    @Override
    public List<TicketUpdateHistory> findByTicketId(Long ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new EntityNotFoundException(Ticket.class, "id", ticketId.toString()));
        return repository.findByTicketId(ticketId);
    }

}
