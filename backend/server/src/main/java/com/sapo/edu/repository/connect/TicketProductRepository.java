package com.sapo.edu.repository.connect;

import com.sapo.edu.entity.compositekey.TicketProductId;
import com.sapo.edu.entity.connectentity.TicketProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketProductRepository extends JpaRepository<TicketProduct, TicketProductId> {
}
