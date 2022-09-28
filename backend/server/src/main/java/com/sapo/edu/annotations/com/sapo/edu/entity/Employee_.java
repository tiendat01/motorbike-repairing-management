package com.sapo.edu.annotations.com.sapo.edu.entity;

import com.sapo.edu.annotations.com.sapo.edu.entity.base.BaseEntity_;
import com.sapo.edu.entity.Employee;
import com.sapo.edu.entity.Role;
import com.sapo.edu.entity.TicketUpdateHistory;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import java.time.LocalDateTime;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Employee.class)
public abstract class Employee_ extends BaseEntity_ {

	public static volatile SingularAttribute<Employee, String> code;
	public static volatile SingularAttribute<Employee, String> address;
	public static volatile SetAttribute<Employee, Role> roles;
	public static volatile SingularAttribute<Employee, Boolean> available;
	public static volatile SingularAttribute<Employee, Boolean> active;
	public static volatile SetAttribute<Employee, TicketUpdateHistory> histories;
	public static volatile SingularAttribute<Employee, LocalDateTime> updatedDate;
	public static volatile SingularAttribute<Employee, String> password;
	public static volatile SingularAttribute<Employee, LocalDateTime> createdDate;
	public static volatile SingularAttribute<Employee, String> phone;
	public static volatile SingularAttribute<Employee, String> name;
	public static volatile SingularAttribute<Employee, Boolean> workingStatus;
	public static volatile SingularAttribute<Employee, String> username;

	public static final String CODE = "code";
	public static final String ADDRESS = "address";
	public static final String ROLES = "roles";
	public static final String AVAILABLE = "available";
	public static final String ACTIVE = "active";
	public static final String HISTORIES = "histories";
	public static final String UPDATED_DATE = "updatedDate";
	public static final String PASSWORD = "password";
	public static final String CREATED_DATE = "createdDate";
	public static final String PHONE = "phone";
	public static final String NAME = "name";
	public static final String WORKING_STATUS = "workingStatus";
	public static final String USERNAME = "username";

}

