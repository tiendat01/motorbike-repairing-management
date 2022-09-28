package com.sapo.edu.annotations.com.sapo.edu.entity.compositekey;

import com.sapo.edu.entity.compositekey.TicketProductId;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(TicketProductId.class)
public abstract class TicketProductId_ {

	public static volatile SingularAttribute<TicketProductId, Long> productId;
	public static volatile SingularAttribute<TicketProductId, Long> ticketId;

	public static final String PRODUCT_ID = "productId";
	public static final String TICKET_ID = "ticketId";

}

