package com.sapo.edu.entity;

import com.sapo.edu.entity.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "ticket_updated_histories")
public class TicketUpdateHistory extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by", nullable = false)
    private Employee updatedBy;

    @Column(name = "old_status", nullable = false)
    private Byte oldStatus;

    @Column(name = "new_status", nullable = false)
    private Byte newStatus;

    @Column(name = "updated_date", nullable = false)
    private LocalDateTime updatedDate;

    @Column(name = "content")
    private String content; // for reservation only


    public TicketUpdateHistory(Ticket ticket, Employee updatedBy, Byte oldStatus, Byte newStatus, LocalDateTime updatedDate) {
        this.ticket = ticket;
        this.updatedBy = updatedBy;
        this.oldStatus = oldStatus;
        this.newStatus = newStatus;
        this.updatedDate = updatedDate;
    }
}
