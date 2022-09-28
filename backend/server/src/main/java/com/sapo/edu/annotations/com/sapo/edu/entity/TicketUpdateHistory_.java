package com.sapo.edu.annotations.com.sapo.edu.entity;

import com.sapo.edu.annotations.com.sapo.edu.entity.base.BaseEntity_;
import com.sapo.edu.entity.Employee;
import com.sapo.edu.entity.Ticket;
import com.sapo.edu.entity.TicketUpdateHistory;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import java.time.LocalDateTime;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(TicketUpdateHistory.class)
public abstract class TicketUpdateHistory_ extends BaseEntity_ {

	public static volatile SingularAttribute<TicketUpdateHistory, Employee> updatedBy;
	public static volatile SingularAttribute<TicketUpdateHistory, Ticket> ticket;
	public static volatile SingularAttribute<TicketUpdateHistory, Byte> newStatus;
	public static volatile SingularAttribute<TicketUpdateHistory, Byte> oldStatus;
	public static volatile SingularAttribute<TicketUpdateHistory, LocalDateTime> updatedDate;
	public static volatile SingularAttribute<TicketUpdateHistory, String> content;

	public static final String UPDATED_BY = "updatedBy";
	public static final String TICKET = "ticket";
	public static final String NEW_STATUS = "newStatus";
	public static final String OLD_STATUS = "oldStatus";
	public static final String UPDATED_DATE = "updatedDate";
	public static final String CONTENT = "content";

}

