package com.sapo.edu.entity;

import com.sapo.edu.entity.base.BaseEntity;
import com.sapo.edu.entity.connectentity.TicketProduct;
import com.sapo.edu.entity.connectentity.TicketService;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tickets")
public class Ticket extends BaseEntity {

    @Column(name = "code", nullable = false, length = 20)
    private String code;

    @Column(name = "description", length = 1024)
    private String description;

    @Column(name = "note", length = 1024)
    private String note;

    @Column(name = "status")
    private Byte status; // -1 / 0 / 1

    @Column(name = "discount")
    private BigDecimal discount;

    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "motorbike_id", nullable = false)
    private Motorbike motorbike;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "repairing_employee_id", nullable = false)
    private Employee repairingEmployee;

    @Column(name = "cashier_name")
    private String cashierName;

    @Column(name = "payment_method", length = 100)
    private String paymentMethod;

    @Column(name = "appointment_date")
    private LocalDateTime appointmentDate;
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @Column(name = "active")
    private Boolean active;



    @OneToMany(mappedBy = "ticket", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private Set<TicketService> ticketsServices = new HashSet<>();
    @OneToMany(mappedBy = "ticket", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private Set<TicketProduct> ticketsProducts = new HashSet<>();


    @OneToMany(mappedBy = "ticket", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private Set<TicketUpdateHistory> histories;


    // Custom here
    public void addProduct(TicketProduct ticketProduct) {
        this.ticketsProducts.add(ticketProduct);
    }
    public void addService(TicketService ticketService) {
        this.ticketsServices.add(ticketService);
    }
    public void removeProduct(TicketProduct ticketProduct) {
        this.ticketsProducts.remove(ticketProduct);
    }
    public void removeService(TicketService ticketService) {
        this.ticketsServices.remove(ticketService);
    }


    public LocalDateTime getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDateTime appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Motorbike getMotorbike() {
        return motorbike;
    }

    public void setMotorbike(Motorbike motorbike) {
        this.motorbike = motorbike;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Employee getRepairingEmployee() {
        return repairingEmployee;
    }

    public void setRepairingEmployee(Employee repairingEmployee) {
        this.repairingEmployee = repairingEmployee;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    public Set<TicketService> getTicketsServices() {
        return ticketsServices;
    }

    public void setTicketsServices(Set<TicketService> ticketsServices) {
        this.ticketsServices = ticketsServices;
    }

    public Set<TicketProduct> getTicketsProducts() {
        return ticketsProducts;
    }

    public void setTicketsProducts(Set<TicketProduct> ticketsProducts) {
        this.ticketsProducts = ticketsProducts;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Set<TicketUpdateHistory> getHistories() {
        return histories;
    }

    public void setHistories(Set<TicketUpdateHistory> histories) {
        this.histories = histories;
    }

    public String getCashierName() {
        return cashierName;
    }

    public void setCashierName(String cashierName) {
        this.cashierName = cashierName;
    }
}