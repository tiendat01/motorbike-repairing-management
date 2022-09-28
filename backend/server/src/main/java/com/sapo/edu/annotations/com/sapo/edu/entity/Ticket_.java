package com.sapo.edu.annotations.com.sapo.edu.entity;

import com.sapo.edu.annotations.com.sapo.edu.entity.base.BaseEntity_;
import com.sapo.edu.entity.*;
import com.sapo.edu.entity.connectentity.TicketProduct;
import com.sapo.edu.entity.connectentity.TicketService;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Ticket.class)
public abstract class Ticket_ extends BaseEntity_ {

	public static volatile SingularAttribute<Ticket, String> note;
	public static volatile SingularAttribute<Ticket, Motorbike> motorbike;
	public static volatile SingularAttribute<Ticket, String> code;
	public static volatile SingularAttribute<Ticket, BigDecimal> totalPrice;
	public static volatile SingularAttribute<Ticket, String> description;
	public static volatile SingularAttribute<Ticket, BigDecimal> discount;
	public static volatile SingularAttribute<Ticket, Boolean> active;
	public static volatile SetAttribute<Ticket, TicketUpdateHistory> histories;
	public static volatile SingularAttribute<Ticket, LocalDateTime> updatedDate;
	public static volatile SingularAttribute<Ticket, LocalDateTime> createdDate;
	public static volatile SingularAttribute<Ticket, Employee> repairingEmployee;
	public static volatile SingularAttribute<Ticket, String> paymentMethod;
	public static volatile SetAttribute<Ticket, TicketService> ticketsServices;
	public static volatile SingularAttribute<Ticket, LocalDateTime> appointmentDate;
	public static volatile SingularAttribute<Ticket, String> cashierName;
	public static volatile SetAttribute<Ticket, TicketProduct> ticketsProducts;
	public static volatile SingularAttribute<Ticket, Byte> status;
	public static volatile SingularAttribute<Ticket, Customer> customer;

	public static final String NOTE = "note";
	public static final String MOTORBIKE = "motorbike";
	public static final String CODE = "code";
	public static final String TOTAL_PRICE = "totalPrice";
	public static final String DESCRIPTION = "description";
	public static final String DISCOUNT = "discount";
	public static final String ACTIVE = "active";
	public static final String HISTORIES = "histories";
	public static final String UPDATED_DATE = "updatedDate";
	public static final String CREATED_DATE = "createdDate";
	public static final String REPAIRING_EMPLOYEE = "repairingEmployee";
	public static final String PAYMENT_METHOD = "paymentMethod";
	public static final String TICKETS_SERVICES = "ticketsServices";
	public static final String APPOINTMENT_DATE = "appointmentDate";
	public static final String CASHIER_NAME = "cashierName";
	public static final String TICKETS_PRODUCTS = "ticketsProducts";
	public static final String STATUS = "status";
	public static final String CUSTOMER = "customer";

}

