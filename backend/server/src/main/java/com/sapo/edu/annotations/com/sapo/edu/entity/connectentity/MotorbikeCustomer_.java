package com.sapo.edu.annotations.com.sapo.edu.entity.connectentity;

import com.sapo.edu.entity.Customer;
import com.sapo.edu.entity.Motorbike;
import com.sapo.edu.entity.compositekey.MotorbikeCustomerId;
import com.sapo.edu.entity.connectentity.MotorbikeCustomer;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(MotorbikeCustomer.class)
public abstract class MotorbikeCustomer_ {

	public static volatile SingularAttribute<MotorbikeCustomer, Motorbike> motorbike;
	public static volatile SingularAttribute<MotorbikeCustomer, MotorbikeCustomerId> id;
	public static volatile SingularAttribute<MotorbikeCustomer, Customer> customer;

	public static final String MOTORBIKE = "motorbike";
	public static final String ID = "id";
	public static final String CUSTOMER = "customer";

}

