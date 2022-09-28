package com.sapo.edu.service.impl;

import com.sapo.edu.common.ERole;
import com.sapo.edu.common.StatusConverter;
import com.sapo.edu.entity.*;
import com.sapo.edu.entity.compositekey.TicketProductId;
import com.sapo.edu.entity.compositekey.TicketServiceId;
import com.sapo.edu.entity.connectentity.TicketProduct;
import com.sapo.edu.entity.connectentity.TicketService;
import com.sapo.edu.exception.BusinessLogicException;
import com.sapo.edu.exception.EntityNotFoundException;
import com.sapo.edu.mapper.dto.TicketDTOMapper;
import com.sapo.edu.mapper.request.TicketProductRequestMapper;
import com.sapo.edu.mapper.request.TicketRequestMapper;
import com.sapo.edu.mapper.request.TicketServiceRequestMapper;
import com.sapo.edu.payload.crudrequest.TicketRequest;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.repository.CustomerRepository;
import com.sapo.edu.repository.EmployeeRepository;
import com.sapo.edu.repository.TicketRepository;
import com.sapo.edu.repository.TicketUpdateHistoryRepository;
import com.sapo.edu.repository.connect.TicketProductRepository;
import com.sapo.edu.repository.connect.TicketServiceRepository;
import com.sapo.edu.repository.dao.TicketDAO;
import com.sapo.edu.security.service.UserDetailsImpl;
import com.sapo.edu.service.base.impl.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TicketServiceImpl extends BaseServiceImpl<Ticket> implements com.sapo.edu.service.TicketService {
    protected TicketServiceImpl(TicketRepository ticketRepository) {
        super(ticketRepository);
    }

    @Autowired
    private TicketRequestMapper requestMapper;
    @Autowired
    private TicketProductRequestMapper ticketProductRequestMapper;
    @Autowired
    private TicketServiceRequestMapper ticketServiceRequestMapper;
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private TicketProductRepository ticketProductRepository;
    @Autowired
    private TicketServiceRepository ticketServiceRepository;
    @Autowired
    private TicketDTOMapper dtoMapper;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private TicketUpdateHistoryRepository ticketUpdateHistoryRepository;
    @Autowired
    private TicketDAO ticketDAO;


    // READ
    @Override
    public List<Ticket> findAll() {
        return super.findAll().stream().filter((item -> item.getActive())).collect(Collectors.toList());
    }
    @Override
    public Ticket findById(Long id) {
        Ticket ticket = super.findById(id);
        if (!ticket.getActive())
            throw new EntityNotFoundException(Ticket.class, "Ticket", id.toString());
        return ticket;
    }
    @Override
    public Map<String, Object> findAllPaging(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Ticket> itemsPerPage = ticketRepository.findByActive(true, pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("currentPage", itemsPerPage.getNumber());
        response.put("totalPages", itemsPerPage.getTotalPages());
        response.put("totalItems", itemsPerPage.getTotalElements());
        response.put("listOfItems", dtoMapper.toTicketDTOs(itemsPerPage.getContent()));

        return response;
    }

    // CREATE
    @Override
    @Transactional
    public Ticket save(TicketRequest ticketRequest) {
        Ticket ticket = requestMapper.toNewTicket(ticketRequest);
        Ticket tmpTicket = ticketRepository.save(ticket); // temporary save to db to get new ticketId
        ticket.setId(tmpTicket.getId());

        ticket.setStatus(Byte.valueOf((byte)0)); // by default when create new ticket
        // check available status of mechanic repairing employee
        if (ticket.getRepairingEmployee() != null) {
            Employee check = ticket.getRepairingEmployee();
            Set<ERole> rolesCheck = check.getRoles().stream().map(Role::getName).collect(Collectors.toSet());
            if (!rolesCheck.stream().anyMatch(EnumSet.of(ERole.ROLE_MECHANIC)::contains))
                throw new BusinessLogicException("Không thể thêm nhân viên không thuộc bộ phận sửa chữa cho phiếu");
            if (!check.getAvailable())
                throw new BusinessLogicException("Nhân viên " + check.getName() + " đang bận, không thể sửa");
            else
                check.setAvailable(false);
        }

        if (ticketRequest.getProductRequestSet() != null)
            for (var item : ticketRequest.getProductRequestSet()) {
                TicketProduct ticketProduct = ticketProductRequestMapper.toTicketProduct(item);
                // check logic: quantity of available product
                Product updatedProduct = ticketProduct.getProduct();
                if (updatedProduct.getQuantity() < ticketProduct.getQuantity())
                    throw new BusinessLogicException("Số lượng sản phẩm yêu cầu không đáp ứng được!");
                updatedProduct.setQuantity(updatedProduct.getQuantity() - ticketProduct.getQuantity()); // auto update to Product table

                ticketProduct.setTicket(ticket);
                ticketProduct.setId(new TicketProductId(ticket.getId(), item.getProductId()));
                ticketProductRepository.save(ticketProduct);

                ticket.addProduct(ticketProduct);
            }
        else
            ticket.setTicketsProducts(new HashSet<>()); // empty, not null

        if (ticketRequest.getServiceRequestSet() != null)
            for (var item : ticketRequest.getServiceRequestSet()) {
                TicketService ticketService = ticketServiceRequestMapper.toTicketService(item);
                ticketService.setTicket(ticket);
                ticketService.setId(new TicketServiceId(ticket.getId(), item.getServiceId()));
                ticketServiceRepository.save(ticketService);

                ticket.addService(ticketService);
            }
        else
            ticket.setTicketsServices(new HashSet<>()); // empty, not null


        ticket.setTotalPrice(calTotalPrice(ticket));
        ticket.setCreatedDate(LocalDateTime.now());
        ticket.setUpdatedDate(LocalDateTime.now());
        ticket.setActive(true);

        // track ticket updated history
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            // *** BUG ***: cannot use employeeRepository.findByUsername ???

//            Employee updatedBy = employeeRepository.findByUsername(authentication.getName())
//                    .orElseThrow(() -> new EntityNotFoundException(Employee.class, "username", authentication.getName()));

            // use authentication.getPrincipal() instead
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Employee updatedBy = employeeRepository.findById(userDetails.getId()).get();
            TicketUpdateHistory updateTrack = new TicketUpdateHistory(ticket, updatedBy, ticket.getStatus(), ticket.getStatus(), ticket.getCreatedDate());
            ticketUpdateHistoryRepository.save(updateTrack);
        }

        return ticketRepository.save(ticket);
    }


    // UPDATE
    @Override
    @Transactional
    public Ticket updateById(Long id, TicketRequest ticketRequest) {
        Ticket oldEntity = this.findById(id);

        if (oldEntity.getStatus() == -1 || oldEntity.getStatus() == 4)
            throw new BusinessLogicException("Đơn sữa chữa đã hoàn thành hoặc huỷ không thể thay đổi thông tin!");

        // status update logic
        Byte previousStatus = oldEntity.getStatus();
        Byte updateStatus = ticketRequest.getStatus();
        if (!previousStatus.equals(updateStatus)) {
            switch (previousStatus) {
                case (0): {
                    if (updateStatus != 1 && updateStatus != -1) {
                        throw new BusinessLogicException("Không thể chuyển sang trạng thái " + StatusConverter.toStatusString(updateStatus) + " từ trạng thái " + StatusConverter.toStatusString(previousStatus));
                    }
                    break;
                }
                case (1): {
                    if (updateStatus != 2 && updateStatus != -1) {
                        throw new BusinessLogicException("Không thể chuyển sang trạng thái " + StatusConverter.toStatusString(updateStatus) + " từ trạng thái " + StatusConverter.toStatusString(previousStatus));
                    }
                    break;
                }
                case (2): {
                    if (updateStatus != 1 && updateStatus != 3) {
                        throw new BusinessLogicException("Không thể chuyển sang trạng thái " + StatusConverter.toStatusString(updateStatus) + " từ trạng thái " + StatusConverter.toStatusString(previousStatus));
                    }
                    break;
                }
                case (3): {
                    if (updateStatus != 4) {
                        throw new BusinessLogicException("Không thể chuyển sang trạng thái " + StatusConverter.toStatusString(updateStatus) + " từ trạng thái " + StatusConverter.toStatusString(previousStatus));
                    }
                    break;
                }
                default:
                    throw new BusinessLogicException("Đơn sữa chữa đã hoàn thành hoặc đã huỷ không thể thay đổi thông tin!");
            }
        }


        // these fields can be updated
        if (ticketRequest.getCustomerId() != null &&
                (oldEntity.getCustomer() == null || !Objects.equals(ticketRequest.getCustomerId(), oldEntity.getCustomer().getId()))
        ) {
            Customer customer = customerRepository.findById(ticketRequest.getCustomerId())
                    .orElseThrow(() -> new EntityNotFoundException(Customer.class, "customerId", ticketRequest.getCustomerId().toString()));
            oldEntity.setCustomer(customer);
        }

        // check available status of mechanic repairing employee if employee change
        if (ticketRequest.getRepairingEmployeeId() != null &&
                (oldEntity.getRepairingEmployee() == null || oldEntity.getRepairingEmployee().getId() != ticketRequest.getRepairingEmployeeId())
        ) {
            // release the old employee if existed
            if (oldEntity.getRepairingEmployee() != null)
                oldEntity.getRepairingEmployee().setAvailable(true);

            Employee check = employeeRepository.findById(ticketRequest.getRepairingEmployeeId())
                    .orElseThrow(() -> new EntityNotFoundException(Employee.class, "repairingEmployeeId", ticketRequest.getRepairingEmployeeId().toString()));
            Set<ERole> rolesCheck = check.getRoles().stream().map(item -> item.getName()).collect(Collectors.toSet());
            if (!rolesCheck.stream().anyMatch(EnumSet.of(ERole.ROLE_MECHANIC)::contains))
                throw new BusinessLogicException("Không thể thêm nhân viên không thuộc bộ phận sửa chữa cho phiếu");
            if (!check.getAvailable())
                throw new BusinessLogicException("Nhân viên " + check.getName() + " đang bận, không thể sửa");
            else {
                check.setAvailable(false);
                oldEntity.setRepairingEmployee(check);
            }
        }

        // release status of mechanic (for some reasons)
        else if (ticketRequest.getRepairingEmployeeId() == null) {
            if (oldEntity.getRepairingEmployee() != null) {
                oldEntity.getRepairingEmployee().setAvailable(true);
                oldEntity.setRepairingEmployee(null);
            }
        }


        oldEntity.setDescription(ticketRequest.getDescription());
        oldEntity.setNote(ticketRequest.getNote());

        oldEntity.setAppointmentDate(ticketRequest.getAppointmentDate());
        oldEntity.setPaymentMethod(ticketRequest.getPaymentMethod());

        // with ticket status: "Chờ thanh toán" => cannot update these fields:
        if (oldEntity.getStatus() != 3) {
            oldEntity.setDiscount(ticketRequest.getDiscount());

            oldEntity.getTicketsProducts().forEach(System.out::println);

            // rollback quantity of products:
            for (var ticketProduct : oldEntity.getTicketsProducts()) {
                // some products deleted (not used when repairing) when being updated
                if (!ticketRequest.getProductRequestSet().stream()
                        .anyMatch(ticketProductRequest -> ticketProductRequest.getProductId() == ticketProduct.getProduct().getId())) {
                    ticketProduct.getProduct().setQuantity(ticketProduct.getProduct().getQuantity() + ticketProduct.getQuantity());
                    ticketProductRepository.deleteById(ticketProduct.getId());
                    oldEntity.removeProduct(ticketProduct);
                }
            }

            // rollback for service:
            for (var ticketService : oldEntity.getTicketsServices()) {
                // some services in ticket will be deleted when ticket being updated
                if (!ticketRequest.getServiceRequestSet().stream()
                        .anyMatch(ticketServiceRequest -> ticketServiceRequest.getServiceId() == ticketService.getService().getId())) {
                    ticketServiceRepository.deleteById(ticketService.getId());
                    oldEntity.removeService(ticketService);
                }
            }

            if (ticketRequest.getProductRequestSet() != null) {
                for (var item : ticketRequest.getProductRequestSet()) {
                    TicketProduct ticketProduct = ticketProductRequestMapper.toTicketProduct(item); // new ticketProduct requested
                    ticketProduct.setTicket(oldEntity);
                    ticketProduct.setId(new TicketProductId(oldEntity.getId(), item.getProductId()));

                    // some products are new when being updated
                    if (!oldEntity.getTicketsProducts().stream().anyMatch(
                            _ticketProduct -> _ticketProduct.getId().equals(ticketProduct.getId())
                    )) {
                        // check logic: quantity of available product
                        Product updatedProduct = ticketProduct.getProduct();
                        if (updatedProduct.getQuantity() < ticketProduct.getQuantity())
                            throw new BusinessLogicException("Số lượng sản phẩm yêu cầu không đáp ứng được!");
                        updatedProduct.setQuantity(updatedProduct.getQuantity() - ticketProduct.getQuantity()); // auto update to Product table

                        ticketProductRepository.save(ticketProduct);
                        oldEntity.addProduct(ticketProduct);
                    }
                    // with the same product
                    else {
                        TicketProduct oldTicketProduct = oldEntity.getTicketsProducts().stream()
                                .filter(_ticketProduct -> _ticketProduct.getId().equals(ticketProduct.getId()))
                                .findFirst().get();
                        // but difference in quantity of products
                        if (!Objects.equals(oldTicketProduct.getQuantity(), ticketProduct.getQuantity())) {
                            // rollback quantity
                            oldTicketProduct.getProduct().setQuantity(oldTicketProduct.getProduct().getQuantity() + oldTicketProduct.getQuantity());

                            // add again:
                            // check logic: quantity of available product
                            Product updatedProduct = oldTicketProduct.getProduct();
                            if (updatedProduct.getQuantity() < ticketProduct.getQuantity())
                                throw new BusinessLogicException("Số lượng sản phẩm yêu cầu không đáp ứng được!");
                            oldTicketProduct.getProduct().setQuantity(updatedProduct.getQuantity() - ticketProduct.getQuantity()); // auto update to Product table
                            oldTicketProduct.setQuantity(ticketProduct.getQuantity());
                            ticketProductRepository.save(oldTicketProduct); // update field quantity
                        }
                    }
                }
            }

            if (ticketRequest.getServiceRequestSet() != null) {
                // not optimized: O(n^2)
                for (var item : ticketRequest.getServiceRequestSet()) {
                    TicketService ticketService = ticketServiceRequestMapper.toTicketService(item); // new tickerService requested
                    ticketService.setTicket(oldEntity);
                    ticketService.setId(new TicketServiceId(oldEntity.getId(), item.getServiceId()));

                    // some services are new when being updated
                    if (!oldEntity.getTicketsServices().stream().anyMatch(
                            _ticketService -> _ticketService.getId().equals(ticketService.getId())
                    )) {
                        ticketServiceRepository.save(ticketService);
                        oldEntity.addService(ticketService);
                    }

                }
            }
        }

        // check who change status: from 3 (Chờ thanh toán) -> 4 (Hoàn thành)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            List<String> roles = authentication.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .collect(Collectors.toList());
//            System.out.println(authentication.getName()); // username
//            roles.stream().forEach(System.out::println);
            if (!roles.stream().anyMatch(List.of("ROLE_ADMIN", "ROLE_CASHIER")::contains) && previousStatus == 3 && updateStatus == 4)
                throw new BusinessLogicException("Nhân viên không thuộc bộ phận thu ngân hoặc không phải là admin: " +
                        "không được cập nhật phiếu sửa chữa từ trạng thái " + StatusConverter.toStatusString(previousStatus) +
                        " sang trạng thái " + StatusConverter.toStatusString(updateStatus));
        }

        // can update status now
        oldEntity.setStatus(ticketRequest.getStatus());
        if (ticketRequest.getStatus() == -1 || ticketRequest.getStatus() == 4 || ticketRequest.getStatus() == 3) // end repairing => release employee
            if (oldEntity.getRepairingEmployee() != null)
                oldEntity.getRepairingEmployee().setAvailable(true);

        oldEntity.setTotalPrice(calTotalPrice(oldEntity));
        oldEntity.setUpdatedDate(LocalDateTime.now());
        oldEntity.setActive(true);

        // track update ticket history
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            // use authentication.getPrincipal() instead
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Employee updatedBy = employeeRepository.findById(userDetails.getId()).get();
            TicketUpdateHistory updateTrack = new TicketUpdateHistory(oldEntity, updatedBy, previousStatus, updateStatus, oldEntity.getUpdatedDate());
            ticketUpdateHistoryRepository.save(updateTrack);
            if (updateStatus == 4)
                oldEntity.setCashierName(updatedBy.getName());
        }

        return ticketRepository.save(oldEntity);
    }


    // DELETE
    @Override
    @Transactional
    public void deleteById(Long id) {
        Ticket inProcessTicket = this.findById(id);
        if (inProcessTicket.getStatus() != -1 && inProcessTicket.getStatus() != 4)
            throw new BusinessLogicException("Phiếu không thể xoá do đang trong quá trình sửa chữa");
        super.deleteById(id);
    }
    @Override
    @Transactional
    public void deleteByIdTmp(Long id) {
        Ticket inProcessTicket = this.findById(id);
        if (inProcessTicket.getStatus() != -1 && inProcessTicket.getStatus() != 4)
            throw new BusinessLogicException("Phiếu không thể xoá do đang trong quá trình sửa chữa");
        inProcessTicket.setActive(false);
        inProcessTicket.setUpdatedDate(LocalDateTime.now());
        ticketRepository.save(inProcessTicket);
    }
    // CANNOT DELETE MULTI !!!





    // UTILs
    private BigDecimal calTotalPrice(Ticket ticket) {
        BigDecimal totalPrice = ticket.getTicketsServices().stream()
                .map(item -> item.getPrice())
                .reduce(new BigDecimal(0), BigDecimal::add);
        for (var item : ticket.getTicketsProducts())
            totalPrice = totalPrice.add(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        return totalPrice;
    }



    // FILTER
    @Override
    public List<Ticket> searchTicket(List<SearchCriteria> params) {
        return ticketDAO.searchTicket(params);
    }

    @Override
    public Map<String, Object> searchTicketPaging(List<SearchCriteria> params, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Ticket> ticketsPerPage = ticketDAO.searchTicketPaging(params, pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("currentPage", ticketsPerPage.getNumber());
        response.put("totalPages", ticketsPerPage.getTotalPages());
        response.put("totalItems", ticketsPerPage.getTotalElements());
        response.put("listOfItems", dtoMapper.toTicketDTOs((List<Ticket>) ticketsPerPage.getContent()));

        return response;
    }
}
