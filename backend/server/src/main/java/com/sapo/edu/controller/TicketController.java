package com.sapo.edu.controller;

import com.sapo.edu.common.SearchParamParser;
import com.sapo.edu.controller.base.BaseController;
import com.sapo.edu.mapper.dto.TicketDTOMapper;
import com.sapo.edu.mapper.request.SearchRequestMapper;
import com.sapo.edu.payload.crudrequest.TicketRequest;
import com.sapo.edu.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/tickets")
public class TicketController implements BaseController<TicketRequest> {
        @Autowired
        private TicketService ticketService;
        @Autowired
        private TicketDTOMapper ticketDTOMapper;
        @Autowired
        private SearchRequestMapper searchRequestMapper;
        @Autowired
        private SearchParamParser searchParamParser;

        @Override
        @GetMapping("")
        @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_CASHIER')")
        public ResponseEntity<?> all() {
                return ResponseEntity.ok()
                                .body(ticketDTOMapper.toTicketDTOs(ticketService.findAll()));
        }

        @Override
        @GetMapping("/{id}")
        @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_CASHIER')")
        public ResponseEntity<?> one(Long id) {
                return ResponseEntity.ok()
                                .body(ticketDTOMapper.toTicketDTO(ticketService.findById(id)));
        }

        @Override
        @PostMapping("")
        @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
        public ResponseEntity<?> create(TicketRequest entity) {
                return ResponseEntity.ok()
                                .body(ticketDTOMapper.toTicketDTO(ticketService.save(entity)));
        }

        @Override
        @PutMapping("/{id}")
        @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_CASHIER')")
        public ResponseEntity<?> update(TicketRequest entity, Long id) {
                return ResponseEntity.ok()
                                .body(ticketDTOMapper.toTicketDTO(ticketService.updateById(id, entity)));
        }

        @Override
        @DeleteMapping("/{id}")
        @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
        public ResponseEntity<?> delete(Long id) {
                ticketService.deleteByIdTmp(id);
                return ResponseEntity.noContent().build();
        }

        @Override
        @GetMapping("/paging")
        @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_CASHIER')")
        public ResponseEntity<?> all(int page, int size) {
                return ResponseEntity.ok()
                                .body(ticketService.findAllPaging(page, size));
        }

        // filter
        @GetMapping("/f")
        @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_CASHIER')")
        public ResponseEntity<?> search(@RequestParam(value = "search", required = false) String search) {
                return ResponseEntity.ok().body(
                                ticketDTOMapper.toTicketDTOs(
                                                ticketService.searchTicket(
                                                                searchRequestMapper.toSearchCriterias(
                                                                                searchParamParser.toSearchString(
                                                                                                search)))));
        }

        @GetMapping("/f/p")
        @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_CASHIER')")
        public ResponseEntity<?> search(@RequestParam(value = "search", required = false) String search,
                        @RequestParam(value = "page", defaultValue = "0", required = false) int page,
                        @RequestParam(value = "size", defaultValue = "3", required = false) int size) {
                return ResponseEntity.ok().body(
                                ticketService.searchTicketPaging(
                                                searchRequestMapper.toSearchCriterias(
                                                                searchParamParser.toSearchString(search)),
                                                page,
                                                size));
        }

}
