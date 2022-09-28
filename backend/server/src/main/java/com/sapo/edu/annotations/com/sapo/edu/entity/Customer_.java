package com.sapo.edu.annotations.com.sapo.edu.entity;

import com.sapo.edu.annotations.com.sapo.edu.entity.base.BaseEntity_;
import com.sapo.edu.entity.Customer;
import com.sapo.edu.entity.Motorbike;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import java.time.LocalDateTime;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Customer.class)
public abstract class Customer_ extends BaseEntity_ {

	public static volatile SetAttribute<Customer, Motorbike> motorbikes;
	public static volatile SingularAttribute<Customer, String> address;
	public static volatile SingularAttribute<Customer, LocalDateTime> createdDate;
	public static volatile SingularAttribute<Customer, String> phone;
	public static volatile SingularAttribute<Customer, String> name;
	public static volatile SingularAttribute<Customer, Boolean> active;
	public static volatile SingularAttribute<Customer, LocalDateTime> updatedDate;

	public static final String MOTORBIKES = "motorbikes";
	public static final String ADDRESS = "address";
	public static final String CREATED_DATE = "createdDate";
	public static final String PHONE = "phone";
	public static final String NAME = "name";
	public static final String ACTIVE = "active";
	public static final String UPDATED_DATE = "updatedDate";

}

