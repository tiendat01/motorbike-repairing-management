package com.sapo.edu.entity.connectentity;

import com.sapo.edu.entity.Service;
import com.sapo.edu.entity.Ticket;
import com.sapo.edu.entity.compositekey.TicketServiceId;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tickets_services")
public class TicketService {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EmbeddedId
    private TicketServiceId id;

    @MapsId("ticketId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;

    @MapsId("serviceId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "service_id", nullable = false)
    private Service service;

    @Column(name = "price", nullable = false, precision = 10)
    private BigDecimal price;

    public TicketServiceId getId() {
        return id;
    }

    public void setId(TicketServiceId id) {
        this.id = id;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "TicketService{" +
                "id=" + id +
                ", ticket=" + ticket +
                ", service=" + service +
                ", price=" + price +
                '}';
    }
}