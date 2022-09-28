package com.sapo.edu.dto.reportDTO;

import java.math.BigDecimal;

public interface TopMechanicDTO {
    Long getIdMechanic();
    String getMechanicName();

    Integer getNumTickets();
    Integer getCompleted();
    Integer getOnProcess();
    Integer getCanceled();
    BigDecimal getTotalValue();
}