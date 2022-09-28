package com.sapo.edu.entity.connectentity;

import com.sapo.edu.entity.Customer;
import com.sapo.edu.entity.Motorbike;
import com.sapo.edu.entity.compositekey.MotorbikeCustomerId;

import javax.persistence.*;

@Deprecated
@Entity
@Table(name = "motorbikes_customers")
public class MotorbikeCustomer {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EmbeddedId
    private MotorbikeCustomerId id;

    @MapsId("motorbikeId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "motorbike_id", nullable = false)
    private Motorbike motorbike;

    @MapsId("customerId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    public MotorbikeCustomerId getId() {
        return id;
    }

    public void setId(MotorbikeCustomerId id) {
        this.id = id;
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

}