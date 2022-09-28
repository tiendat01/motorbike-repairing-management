package com.sapo.edu.entity.compositekey;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class TicketServiceId implements Serializable {
    private static final long serialVersionUID = -6262472335360912021L;
    @Column(name = "ticket_id", nullable = false)
    private Long ticketId;

    @Column(name = "service_id", nullable = false)
    private Long serviceId;

    public Long getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        TicketServiceId entity = (TicketServiceId) o;
        return Objects.equals(this.serviceId, entity.serviceId) &&
                Objects.equals(this.ticketId, entity.ticketId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(serviceId, ticketId);
    }

}