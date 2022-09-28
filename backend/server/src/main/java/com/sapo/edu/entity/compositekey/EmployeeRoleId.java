package com.sapo.edu.entity.compositekey;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Deprecated
@Embeddable
public class EmployeeRoleId implements Serializable {
    private static final long serialVersionUID = -2396351224665303352L;
    @Column(name = "employee_id", nullable = false)
    private Long employeeId;

    @Column(name = "role_id", nullable = false)
    private Long roleId;

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        EmployeeRoleId entity = (EmployeeRoleId) o;
        return Objects.equals(this.roleId, entity.roleId) &&
                Objects.equals(this.employeeId, entity.employeeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roleId, employeeId);
    }

}