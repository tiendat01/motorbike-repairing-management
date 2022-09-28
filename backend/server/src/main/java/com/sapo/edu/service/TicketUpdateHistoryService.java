package com.sapo.edu.service;

import com.sapo.edu.entity.TicketUpdateHistory;
import com.sapo.edu.service.base.BaseService;

import java.util.List;

public interface TicketUpdateHistoryService  extends BaseService<TicketUpdateHistory> {
    List<TicketUpdateHistory> findByTicketId(Long ticketId);
}
