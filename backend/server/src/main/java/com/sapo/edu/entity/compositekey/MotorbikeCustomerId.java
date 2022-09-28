package com.sapo.edu.entity.compositekey;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Deprecated
@Embeddable
public class MotorbikeCustomerId implements Serializable {
    private static final long serialVersionUID = 200426154949813324L;
    @Column(name = "motorbike_id", nullable = false)
    private Long motorbikeId;

    @Column(name = "customer_id", nullable = false)
    private Long customerId;

    public Long getMotorbikeId() {
        return motorbikeId;
    }

    public void setMotorbikeId(Long motorbikeId) {
        this.motorbikeId = motorbikeId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        MotorbikeCustomerId entity = (MotorbikeCustomerId) o;
        return Objects.equals(this.customerId, entity.customerId) &&
                Objects.equals(this.motorbikeId, entity.motorbikeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(customerId, motorbikeId);
    }

}