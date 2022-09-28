package com.sapo.edu.service;

import com.sapo.edu.entity.Ticket;
import com.sapo.edu.payload.crudrequest.TicketRequest;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.service.base.BaseService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

public interface TicketService extends BaseService<Ticket> {
    Ticket save(TicketRequest ticketRequest);
    Ticket updateById(Long id, TicketRequest newTicketRequest);

    @Transactional
    void deleteByIdTmp(Long id);

    // filter
    List<Ticket> searchTicket(List<SearchCriteria> params);
    Map<String, Object> searchTicketPaging(List<SearchCriteria> params, int page, int size);
}
