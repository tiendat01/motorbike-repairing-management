package com.sapo.edu.service.impl;

import com.sapo.edu.common.DateConverter;
import com.sapo.edu.dto.reportDTO.*;
import com.sapo.edu.repository.TicketRepository;
import com.sapo.edu.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public List<BigDecimal> selectRevenueByDate(String startDate, String endDate) {
        LocalDateTime start = DateConverter.toLocalDateTime(startDate);
        LocalDateTime end = DateConverter.toLocalDateTime(endDate);
        end = end.plusDays(1);         // for limitation of MySQL
        List<RevenueDTO> resultList = ticketRepository.selectRevenueByDate(
                DateConverter.dateTimeToString(start),
                DateConverter.dateTimeToString(end));
        List<LocalDate> dateRange = start.toLocalDate()
                .datesUntil(end.toLocalDate())
                .collect(Collectors.toList());
        List<BigDecimal> revenues = new ArrayList<>();
        // should use algorithm
        for (var item : dateRange) {
            boolean isDupl = false;
            for (var revenueDTO : resultList) {
                if (item.equals(revenueDTO.getDate())) {
                    revenues.add(revenueDTO.getRevenue());
                    isDupl = true;
                    break;
                }
            }
            if (!isDupl)
                revenues.add(new BigDecimal(0));
        }
        return revenues;
    }

    @Override
    public List<BigDecimal> selectRevenueByMonth(String startDate, String endDate) {
        LocalDate start = DateConverter.toLocalDateTime(startDate).toLocalDate();
        start = start.with(TemporalAdjusters.firstDayOfMonth()); // first day of month
        LocalDate end = DateConverter.toLocalDateTime(endDate).toLocalDate();
        end = end.withDayOfMonth(end.getMonth().length(end.isLeapYear())); // last day of month
        List<BigDecimal> revenues = new ArrayList<>();
        List<RevenueDTO> resultList = ticketRepository.selectRevenueByMonth(DateConverter.dateToString(start), DateConverter.dateToString(end));

        for (LocalDate date = start; date.isBefore(end); date = date.plusMonths(1)) {
            boolean isDupl = false;
            for (var revenueDTO : resultList) {
                if (revenueDTO.getMonth() == date.getMonthValue()
                    && revenueDTO.getYear() == date.getYear()) {
                    isDupl = true;
                    revenues.add(revenueDTO.getRevenue());
                    break;
                }
            }
            if (!isDupl)
                revenues.add(new BigDecimal(0));
        }

        return revenues;
    }

    @Override
    public List<TopMechanicDTO> selectTopMechanicByDate(String startDate, String endDate, Integer top) { // top can be configured
        LocalDateTime start = DateConverter.toLocalDateTime(startDate);
        LocalDateTime end = DateConverter.toLocalDateTime(endDate);
        end = end.plusDays(1);         // for limitation of MySQL
        return ticketRepository.selectTopMechanicByDate(
                DateConverter.dateTimeToString(start),
                DateConverter.dateTimeToString(end),
                top);
    }

    @Override
    public List<TopMechanicDTO> selectMechanicTicket(String startDate, String endDate) {
        LocalDateTime start = DateConverter.toLocalDateTime(startDate);
        LocalDateTime end = DateConverter.toLocalDateTime(endDate);
        end = end.plusDays(1);         // for limitation of MySQL
        return ticketRepository.selectMechanicTicket(
                DateConverter.dateTimeToString(start),
                DateConverter.dateTimeToString(end));
    }

    @Override
    public List<TopUsedProductDTO> selectTopProductByDate(String startDate, String endDate, Integer top) {
        LocalDateTime start = DateConverter.toLocalDateTime(startDate);
        LocalDateTime end = DateConverter.toLocalDateTime(endDate);
        end = end.plusDays(1);         // for limitation of MySQL
        return ticketRepository.selectTopUsedProduct(
                DateConverter.dateTimeToString(start),
                DateConverter.dateTimeToString(end),
                top);
    }

    @Override
    public List<TopUsedServiceDTO> selectTopServiceByDate(String startDate, String endDate, Integer top) {
        LocalDateTime start = DateConverter.toLocalDateTime(startDate);
        LocalDateTime end = DateConverter.toLocalDateTime(endDate);
        end = end.plusDays(1);         // for limitation of MySQL
        return ticketRepository.selectTopUsedService(
                DateConverter.dateTimeToString(start),
                DateConverter.dateTimeToString(end),
                top);
    }


    @Override
    public List<TopCustomerDTO> selectTopCustomer(Integer top) {
        return ticketRepository.selectTopCustomer(top);
    }

    @Override
    public List<Integer> selectNewCustomerByDate(String startDate, String endDate) {
        LocalDateTime start = DateConverter.toLocalDateTime(startDate);
        LocalDateTime end = DateConverter.toLocalDateTime(endDate);
        end = end.plusDays(1);         // for limitation of MySQL
        List<CountNewCustomerDTO> resultList = ticketRepository.selectNewCustomerByDate(
                DateConverter.dateTimeToString(start),
                DateConverter.dateTimeToString(end));
        List<LocalDate> dateRange = start.toLocalDate()
                .datesUntil(end.toLocalDate())
                .collect(Collectors.toList());
        List<Integer> numberOfCustomerss = new ArrayList<>();
        // should use algorithm
        for (var item : dateRange) {
            boolean isDupl = false;
            for (var dto : resultList) {
                if (item.equals(dto.getDate())) {
                    numberOfCustomerss.add(dto.getNumberOfNewCustomers());
                    isDupl = true;
                    break;
                }
            }
            if (!isDupl)
                numberOfCustomerss.add(0);
        }
        return numberOfCustomerss;
    }

    @Override
    public List<Integer> selectNewCustomerByMonth(String startDate, String endDate) {
        LocalDate start = DateConverter.toLocalDateTime(startDate).toLocalDate();
        start = start.with(TemporalAdjusters.firstDayOfMonth()); // first day of month
        LocalDate end = DateConverter.toLocalDateTime(endDate).toLocalDate();
        end = end.withDayOfMonth(end.getMonth().length(end.isLeapYear())); // last day of month
        List<Integer> numberOfCustomerss = new ArrayList<>();
        List<CountNewCustomerDTO> resultList = ticketRepository.selectNewCustomerByMonth(DateConverter.dateToString(start), DateConverter.dateToString(end));

        for (LocalDate date = start; date.isBefore(end); date = date.plusMonths(1)) {
            boolean isDupl = false;
            for (var dto : resultList) {
                if (dto.getMonth() == date.getMonthValue()
                        && dto.getYear() == date.getYear()) {
                    isDupl = true;
                    numberOfCustomerss.add(dto.getNumberOfNewCustomers());
                    break;
                }
            }
            if (!isDupl)
                numberOfCustomerss.add(0);
        }

        return numberOfCustomerss;
    }
}