package com.sapo.edu.entity;

import com.sapo.edu.entity.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "brands")
public class Brand extends BaseEntity {
    @Column(name = "brand_name", nullable = false, length = 50)
    private String brandName;

    // One-To-Many relationship
    @OneToMany(mappedBy = "brand", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private Set<Model> models = new HashSet<>();


    // Note: Override equalsAndHashCode of @Data
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        Brand brand = (Brand) o;

        return new EqualsBuilder().appendSuper(super.equals(o)).append(brandName, brand.brandName).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).appendSuper(super.hashCode()).append(brandName).toHashCode();
    }
}
