package com.sapo.edu.repository.connect;

import com.sapo.edu.entity.compositekey.TicketServiceId;
import com.sapo.edu.entity.connectentity.TicketService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketServiceRepository extends JpaRepository<TicketService, TicketServiceId> {
}
