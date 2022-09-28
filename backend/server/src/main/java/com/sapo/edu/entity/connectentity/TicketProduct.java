package com.sapo.edu.entity.connectentity;

import com.sapo.edu.entity.Product;
import com.sapo.edu.entity.Ticket;
import com.sapo.edu.entity.compositekey.TicketProductId;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tickets_products")
public class TicketProduct {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EmbeddedId
    private TicketProductId id;

    @MapsId("ticketId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;

    @MapsId("productId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "price", nullable = false, precision = 10)
    private BigDecimal price;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    public TicketProductId getId() {
        return id;
    }

    public void setId(TicketProductId id) {
        this.id = id;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "TicketProduct{" +
                "id=" + id +
                ", ticket=" + ticket +
                ", product=" + product +
                ", price=" + price +
                ", quantity=" + quantity +
                '}';
    }
}