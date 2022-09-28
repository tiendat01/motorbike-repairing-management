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
public class TicketProductId implements Serializable {
    private static final long serialVersionUID = -2917234129830404350L;
    @Column(name = "ticket_id", nullable = false)
    private Long ticketId;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    public Long getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        TicketProductId entity = (TicketProductId) o;
        return Objects.equals(this.productId, entity.productId) &&
                Objects.equals(this.ticketId, entity.ticketId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, ticketId);
    }

}