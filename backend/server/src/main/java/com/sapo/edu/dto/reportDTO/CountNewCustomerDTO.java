package com.sapo.edu.dto.reportDTO;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface CountNewCustomerDTO {
    LocalDate getDate();

    Integer getMonth();
    Integer getYear();

    Integer getNumberOfNewCustomers(); // `numberOfNewCustomers`

}
