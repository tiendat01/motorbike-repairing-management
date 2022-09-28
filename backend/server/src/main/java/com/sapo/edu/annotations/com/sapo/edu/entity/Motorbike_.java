package com.sapo.edu.annotations.com.sapo.edu.entity;

import com.sapo.edu.annotations.com.sapo.edu.entity.base.BaseEntity_;
import com.sapo.edu.entity.Customer;
import com.sapo.edu.entity.Model;
import com.sapo.edu.entity.Motorbike;
import com.sapo.edu.entity.Ticket;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Motorbike.class)
public abstract class Motorbike_ extends BaseEntity_ {

	public static volatile SetAttribute<Motorbike, Ticket> tickets;
	public static volatile SingularAttribute<Motorbike, String> licensePlates;
	public static volatile SingularAttribute<Motorbike, Model> model;
	public static volatile SetAttribute<Motorbike, Customer> customers;

	public static final String TICKETS = "tickets";
	public static final String LICENSE_PLATES = "licensePlates";
	public static final String MODEL = "model";
	public static final String CUSTOMERS = "customers";

}

