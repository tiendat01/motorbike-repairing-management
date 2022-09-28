package com.sapo.edu.annotations.com.sapo.edu.entity;

import com.sapo.edu.annotations.com.sapo.edu.entity.base.BaseEntity_;
import com.sapo.edu.common.ERole;
import com.sapo.edu.entity.Employee;
import com.sapo.edu.entity.Role;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Role.class)
public abstract class Role_ extends BaseEntity_ {

	public static volatile SingularAttribute<Role, ERole> name;
	public static volatile SetAttribute<Role, Employee> employees;

	public static final String NAME = "name";
	public static final String EMPLOYEES = "employees";

}

