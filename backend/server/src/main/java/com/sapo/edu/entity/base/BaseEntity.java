package com.sapo.edu.entity.base;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;

@MappedSuperclass
@Data
// @EntityListeners(AuditingEntityListener.class)

public abstract class BaseEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    protected Long id;



//    need @EntityListeners(AuditingEntityListener.class) because database not have these properties
//    @Column
//    @CreatedBy
//    protected String createdBy;
//
//    @Column
//    @CreatedDate
//    protected Timestamp createdDate;
//
//    @Column
//    @LastModifiedBy
//    protected String modifiedBy;
//
//    @Column
//    @LastModifiedDate
//    protected Timestamp modifiedDate;
}