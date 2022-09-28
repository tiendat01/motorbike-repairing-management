package com.sapo.edu.entity;

import com.sapo.edu.entity.base.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "models")
public class Model extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @Column(name = "model_name", nullable = false, length = 50)
    private String modelName;

    // One-to-Many Relationship
    @OneToMany(mappedBy = "model", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private Set<Motorbike> motorbikes = new HashSet<>();




    // NOTE: Model is the reference part of Many-to-Many relationship with Product
    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {CascadeType.MERGE, CascadeType.PERSIST},
    mappedBy = "models")
    private Set<Product> products = new HashSet<>(); // reference part in ManyToMany relation with Product
    public void addProduct(Product product) {
        this.products.add(product);
        product.getModels().add(this);
    }
    public void addProduct(Long productId) {
        Product product = this.products.stream()
                .filter(p -> p.getId() == productId)
                .findFirst().orElse(null);
        if (product != null) {
            this.products.add(product);
            product.getModels().add(this);
        }
    }
    public void removeProduct(Long productId) {
        Product product = this.products.stream()
                .filter(p -> p.getId() == productId)
                .findFirst().orElse(null);
        if (product != null) {
            this.products.remove(product);
            product.getModels().remove(this);
        }
    }
    public void removeProduct(Product p) {
        if (p != null) {
            this.products.remove(p);
            p.getModels().remove(this);
        }
    }


    @Override
    public String toString() {
        return "Model{" +
                "brand=" + brand.getBrandName() +
                ", modelName='" + modelName + '\'' +
                ", products=" + products.stream().map(item -> item.getName()).collect(Collectors.toSet()) +
                ", id=" + id +
                '}';
    }
}
