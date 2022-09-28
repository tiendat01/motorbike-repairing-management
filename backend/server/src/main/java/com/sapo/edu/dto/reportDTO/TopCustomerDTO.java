package com.sapo.edu.dto.reportDTO;

import java.math.BigDecimal;

public interface TopCustomerDTO {
    Long getCustomerId(); // `customerId`
    String getCustomerName(); // `customerName`
    Integer getFrequency(); // `frequency`
    BigDecimal getMoneyPaid(); // `moneyPaid`
}
