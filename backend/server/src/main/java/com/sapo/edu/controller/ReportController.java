package com.sapo.edu.controller;

import com.sapo.edu.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/v1/analysis")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping("/revenue/day")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> selectRevenueByDate(@RequestParam Map<String, String> params) {
        String startDate = params.get("startDate");
        String endDate = params.get("endDate");
        return ResponseEntity.ok().body(reportService.selectRevenueByDate(startDate, endDate));
    }

    @GetMapping("/revenue/month")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> selectRevenueByMonth(@RequestParam Map<String, String> params) {
        String startDate = params.get("startDate");
        String endDate = params.get("endDate");
        return ResponseEntity.ok().body(reportService.selectRevenueByMonth(startDate, endDate));
    }

    @GetMapping("/mechanic/top")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> selectTopMechanicByDate(@RequestParam Map<String, String> params) {
        String startDate = params.get("startDate");
        String endDate = params.get("endDate");
        Integer top = Integer.parseInt(params.get("top"));

        return ResponseEntity.ok().body(reportService.selectTopMechanicByDate(startDate, endDate, top));
    }

    @GetMapping("/mechanic/tickets")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> selectMechanicAndTickets(@RequestParam Map<String, String> params) {
        String startDate = params.get("startDate");
        String endDate = params.get("endDate");
        return ResponseEntity.ok().body(reportService.selectMechanicTicket(startDate, endDate));
    }

    @GetMapping("/product/used")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> selectTopProduct(@RequestParam Map<String, String> params) {
        String startDate = params.get("startDate");
        String endDate = params.get("endDate");
        Integer top = Integer.parseInt(params.get("top"));

        return ResponseEntity.ok().body(reportService.selectTopProductByDate(startDate, endDate, top));
    }

    @GetMapping("/service/used")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> selectTopService(@RequestParam Map<String, String> params) {
        String startDate = params.get("startDate");
        String endDate = params.get("endDate");
        Integer top = Integer.parseInt(params.get("top"));

        return ResponseEntity.ok().body(reportService.selectTopServiceByDate(startDate, endDate, top));
    }


    @GetMapping("/customer/top")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> selectTopCustomer(@RequestParam Map<String, String> params) {
        Integer top = Integer.parseInt(params.get("top"));
        return ResponseEntity.ok().body(reportService.selectTopCustomer(top));
    }

    @GetMapping("/customer/new/day")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> selectNewCustomerByDate(@RequestParam Map<String, String> params) {
        String startDate = params.get("startDate");
        String endDate = params.get("endDate");

        return ResponseEntity.ok().body(reportService.selectNewCustomerByDate(startDate, endDate));
    }

    @GetMapping("/customer/new/month")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> selectNewCustomerByMonth(@RequestParam Map<String, String> params) {
        String startDate = params.get("startDate");
        String endDate = params.get("endDate");

        return ResponseEntity.ok().body(reportService.selectNewCustomerByMonth(startDate, endDate));
    }
}