package com.sapo.edu.repository;

import com.sapo.edu.entity.TicketUpdateHistory;
import com.sapo.edu.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketUpdateHistoryRepository extends BaseRepository<TicketUpdateHistory, Long> {
    List<TicketUpdateHistory> findByTicketId(Long ticketId);

}
