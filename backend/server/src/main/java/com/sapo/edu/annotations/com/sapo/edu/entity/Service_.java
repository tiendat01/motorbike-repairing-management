package com.sapo.edu.annotations.com.sapo.edu.entity;

import com.sapo.edu.annotations.com.sapo.edu.entity.base.BaseEntity_;
import com.sapo.edu.entity.Service;
import com.sapo.edu.entity.connectentity.TicketService;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Service.class)
public abstract class Service_ extends BaseEntity_ {

	public static volatile SingularAttribute<Service, String> code;
	public static volatile SingularAttribute<Service, LocalDateTime> createdDate;
	public static volatile SingularAttribute<Service, BigDecimal> price;
	public static volatile SingularAttribute<Service, String> name;
	public static volatile SetAttribute<Service, TicketService> ticketServices;
	public static volatile SingularAttribute<Service, String> description;
	public static volatile SingularAttribute<Service, Boolean> active;
	public static volatile SingularAttribute<Service, LocalDateTime> updatedDate;

	public static final String CODE = "code";
	public static final String CREATED_DATE = "createdDate";
	public static final String PRICE = "price";
	public static final String NAME = "name";
	public static final String TICKET_SERVICES = "ticketServices";
	public static final String DESCRIPTION = "description";
	public static final String ACTIVE = "active";
	public static final String UPDATED_DATE = "updatedDate";

}

