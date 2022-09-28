package com.sapo.edu.entity;

import com.sapo.edu.common.ERole;
import com.sapo.edu.entity.base.BaseEntity;
import lombok.*;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "roles")
@NoArgsConstructor
@Data
// @EntityListeners(AuditingEntityListener.class) // needed if some field of object not in database
public class Role extends BaseEntity {
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;

    // NOTE Role object is reference part in ManyToMany relation with Employee object
    @ManyToMany(mappedBy = "roles") // roles is the name of set in Employee class,
    @Cascade({ CascadeType.SAVE_UPDATE, CascadeType.MERGE, CascadeType.PERSIST})
    private Set<Employee> employees;

    public Role(ERole name) {
        this.name = name;
    }

    // NOTE: override equalsAndHashCode in @Data: compare name only
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        Role role = (Role) o;

        return new EqualsBuilder().appendSuper(super.equals(o)).append(name, role.name).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).appendSuper(super.hashCode()).append(name).toHashCode();
    }

    @Override
    public String toString() {
        return "Role{" +
                "name=" + name +
                ", employees=" + "none (avoid recursion if calling all employees set!)" +
                ", id=" + id +
                '}';
    }
}