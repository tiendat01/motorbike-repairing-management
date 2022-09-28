package com.sapo.edu.controller;

import com.sapo.edu.controller.base.BaseController;
import com.sapo.edu.entity.TicketUpdateHistory;
import com.sapo.edu.mapper.dto.TicketUpdateHistoryDTOMapper;
import com.sapo.edu.service.TicketUpdateHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/v1/ticketUpdateTrack")
public class TicketUpdateHistoryController implements BaseController<TicketUpdateHistory> {
    @Autowired
    private TicketUpdateHistoryDTOMapper dtoMapper;
    @Autowired
    private TicketUpdateHistoryService service;

    @Override
    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_CASHIER')")
    public ResponseEntity<?> all() {
        return ResponseEntity.ok().body(
                dtoMapper.toTicketUpdateHistoryDTOs(service.findAll()));
    }


    @GetMapping("/ticket/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_CASHIER')")
    public ResponseEntity<?> allByTicketId(@PathVariable(value = "id") Long ticketId) {
        return ResponseEntity.ok()
                .body(dtoMapper.toTicketUpdateHistoryDTOs(service.findByTicketId(ticketId)));
    }


    // ============== NOT USED ================= //
    @Override
    public ResponseEntity<?> one(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<?> create(TicketUpdateHistory entity) {
        return null;
    }

    @Override
    public ResponseEntity<?> update(TicketUpdateHistory entity, Long id) {
        return null;
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<?> all(int page, int size) {
        return null;
    }
}
