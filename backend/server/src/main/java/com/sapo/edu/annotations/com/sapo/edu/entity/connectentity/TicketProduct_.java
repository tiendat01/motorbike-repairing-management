package com.sapo.edu.annotations.com.sapo.edu.entity.connectentity;

import com.sapo.edu.entity.Product;
import com.sapo.edu.entity.Ticket;
import com.sapo.edu.entity.compositekey.TicketProductId;
import com.sapo.edu.entity.connectentity.TicketProduct;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import java.math.BigDecimal;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(TicketProduct.class)
public abstract class TicketProduct_ {

	public static volatile SingularAttribute<TicketProduct, Product> product;
	public static volatile SingularAttribute<TicketProduct, Integer> quantity;
	public static volatile SingularAttribute<TicketProduct, Ticket> ticket;
	public static volatile SingularAttribute<TicketProduct, BigDecimal> price;
	public static volatile SingularAttribute<TicketProduct, TicketProductId> id;

	public static final String PRODUCT = "product";
	public static final String QUANTITY = "quantity";
	public static final String TICKET = "ticket";
	public static final String PRICE = "price";
	public static final String ID = "id";

}

