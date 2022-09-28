package com.sapo.edu.controller;

import com.sapo.edu.common.SearchParamParser;
import com.sapo.edu.controller.base.BaseController;
import com.sapo.edu.mapper.dto.CustomerDTOMapper;
import com.sapo.edu.mapper.dto.MotorbikeDTOMapper;
import com.sapo.edu.mapper.dto.TicketDTOMapper;
import com.sapo.edu.mapper.request.CustomerRequestMapper;
import com.sapo.edu.mapper.request.SearchRequestMapper;
import com.sapo.edu.payload.connectrequest.MotorbikeCustomerConnectRequest;
import com.sapo.edu.payload.crudrequest.CustomerRequest;
import com.sapo.edu.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/v1/customers")
public class CustomerController implements BaseController<CustomerRequest> {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private CustomerDTOMapper dtoMapper;
    @Autowired
    private CustomerRequestMapper requestMapper;
    @Autowired
    private MotorbikeDTOMapper motorbikeDTOMapper;
    @Autowired
    private TicketDTOMapper ticketDTOMapper;
    @Autowired
    private SearchRequestMapper searchRequestMapper;
    @Autowired
    private SearchParamParser searchParamParser;

    @Override
    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> all() {
        return ResponseEntity
                .ok(dtoMapper.toCustomerDTOs(customerService.findAll()));
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> one(Long id) {
        return ResponseEntity
                .ok()
                .body(dtoMapper.toCustomerDTO(customerService.findById(id)));
    }

    @Override
    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> create(CustomerRequest customerRequest) {
        return ResponseEntity
                .ok(dtoMapper.toCustomerDTO(customerService.save(requestMapper.toCustomer(customerRequest))));
    }

    @Override
    @Transactional
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> update(CustomerRequest entity, Long id) {
        return ResponseEntity
                .ok(dtoMapper
                        .toCustomerDTO(customerService.updateById(id, requestMapper.toCustomer(entity))));
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> delete(Long id) {
        customerService.deleteByIdTmp(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete_multi")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteMulti(@RequestBody List<Long> ids) {
        customerService.deleteByIdArrayTmp(ids);
        return ResponseEntity.noContent().build();
    }

    @Override
    @GetMapping("/paging")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> all(int page, int size) {
        return ResponseEntity.ok()
                .body(customerService.findAllPaging(page, size));
    }

    // Many-to-Many relationship:
    @GetMapping("/{id}/motobikes")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> allMotorbikesByCustomerId(@PathVariable(value = "id") Long customerId) {
        return ResponseEntity.ok()
                .body(motorbikeDTOMapper.toMotorbikeDTOs(customerService.getAllMotorbikesByCustomersId(customerId)));
    }

    @PostMapping("/{id}/motobikes")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> addMotorbikeToCustomer(@PathVariable(value = "id") Long customerId,
            @RequestBody MotorbikeCustomerConnectRequest motorbikeId) {
        return ResponseEntity.ok()
                .body(motorbikeDTOMapper.toMotorbikeDTO(
                        customerService.addMotorbikeToCustomer(motorbikeId.getMotorbikeId(), customerId)));
    }

    @DeleteMapping("/{id}/motobikes/{motorbikeId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> deleteMotorbikeFromCustomer(@PathVariable(value = "id") Long customerId,
            @PathVariable(value = "motorbikeId") Long motorbikeId) {
        customerService.deleteMotorbikeFromCustomer(motorbikeId, customerId);
        return ResponseEntity.noContent().build();
    }

    // filter
    @GetMapping("/f")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> search(@RequestParam(value = "search", required = false) String search) {
        return ResponseEntity.ok().body(
                dtoMapper.toCustomerDTOs(
                        customerService.searchCustomer(
                                searchRequestMapper.toSearchCriterias(
                                        searchParamParser.toSearchString(search)))));
    }

    @GetMapping("/{id}/tickets")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> allTickets(@PathVariable(value = "id") Long id) {
        return ResponseEntity.ok()
                .body(ticketDTOMapper.toTicketDTOs(customerService.findAllTicket(id)));
    }

}
