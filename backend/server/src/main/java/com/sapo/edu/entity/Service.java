package com.sapo.edu.entity;

import com.sapo.edu.entity.base.BaseEntity;
import com.sapo.edu.entity.connectentity.TicketService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "services")
public class Service extends BaseEntity {

    @Column(name = "code", nullable = false, length = 20)
    private String code;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "description", length = 1024)
    private String description;

    @Column(name = "price", nullable = false, precision = 10)
    private BigDecimal price;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @Column(name = "active")
    private Boolean active;



    @OneToMany(mappedBy = "service", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private Set<TicketService> ticketServices = new HashSet<>();
}