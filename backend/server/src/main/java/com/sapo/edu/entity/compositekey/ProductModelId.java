package com.sapo.edu.entity.compositekey;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Deprecated
@Embeddable
public class ProductModelId implements Serializable {
    private static final long serialVersionUID = -6818823603526716442L;
    @Column(name = "model_id", nullable = false)
    private Long modelId;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    public Long getModelId() {
        return modelId;
    }

    public void setModelId(Long modelId) {
        this.modelId = modelId;
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
        ProductModelId entity = (ProductModelId) o;
        return Objects.equals(this.productId, entity.productId) &&
                Objects.equals(this.modelId, entity.modelId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, modelId);
    }

}