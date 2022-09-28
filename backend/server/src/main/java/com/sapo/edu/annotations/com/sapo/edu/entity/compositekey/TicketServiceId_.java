package com.sapo.edu.annotations.com.sapo.edu.entity.compositekey;

import com.sapo.edu.entity.compositekey.TicketServiceId;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(TicketServiceId.class)
public abstract class TicketServiceId_ {

	public static volatile SingularAttribute<TicketServiceId, Long> serviceId;
	public static volatile SingularAttribute<TicketServiceId, Long> ticketId;

	public static final String SERVICE_ID = "serviceId";
	public static final String TICKET_ID = "ticketId";

}

