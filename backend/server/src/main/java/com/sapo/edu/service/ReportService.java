package com.sapo.edu.service;

import com.sapo.edu.dto.reportDTO.TopCustomerDTO;
import com.sapo.edu.dto.reportDTO.TopMechanicDTO;
import com.sapo.edu.dto.reportDTO.TopUsedProductDTO;
import com.sapo.edu.dto.reportDTO.TopUsedServiceDTO;

import java.math.BigDecimal;
import java.util.List;

public interface ReportService {
    List<BigDecimal> selectRevenueByDate(String startDate, String endDate);

    List<BigDecimal> selectRevenueByMonth(String startDate, String endDate);

    List<TopMechanicDTO> selectTopMechanicByDate(String startDate, String endDate, Integer top);

    List<TopMechanicDTO> selectMechanicTicket(String startDate, String endDate);

    List<TopUsedProductDTO> selectTopProductByDate(String startDate, String endDate, Integer top);

    List<TopUsedServiceDTO> selectTopServiceByDate(String startDate, String endDate, Integer top);

    List<TopCustomerDTO> selectTopCustomer(Integer top);

    List<Integer> selectNewCustomerByDate(String startDate, String endDate);

    List<Integer> selectNewCustomerByMonth(String startDate, String endDate);
}