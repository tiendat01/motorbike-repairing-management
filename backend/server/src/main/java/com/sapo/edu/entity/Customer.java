package com.sapo.edu.entity;

import com.sapo.edu.entity.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customers")
public class Customer extends BaseEntity {

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "phone", nullable = false, length = 25)
    private String phone;

    @Column(name = "address", length = 100)
    private String address;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @Column(name = "active")
    private Boolean active;



    // NOTE: Customer is the reference part of ManyToMany relationship with Motorbike
    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {CascadeType.MERGE, CascadeType.PERSIST},
    mappedBy = "customers")
    private Set<Motorbike> motorbikes = new HashSet<>();

    public void addMotorbike(Motorbike motorbike) {
        this.motorbikes.add(motorbike);
        motorbike.getCustomers().add(this);
    }
    public void removeMotorbike(Long motorbikeId) {
        Motorbike motorbike = this.motorbikes.stream()
                .filter(mtb -> mtb.getId() == motorbikeId)
                .findFirst().orElse(null);
        if (motorbike != null) {
            this.motorbikes.remove(motorbike);
            motorbike.getCustomers().remove(this);
        }
    }
    public void removeMotorbike(Motorbike m) {
        if (m != null) {
            this.motorbikes.remove(m);
            m.getCustomers().remove(this);
        }
    }



//    Even if this is ManyToOne, but not delete the child entity Ticket, depending on Customer entity
//    @OneToMany(mappedBy = "customer", cascade = CascadeType.PERSIST, orphanRemoval = true)
//    private Set<Ticket> tickets = new HashSet<>();

}