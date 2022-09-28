package com.sapo.edu.annotations.com.sapo.edu.entity.connectentity;

import com.sapo.edu.entity.Employee;
import com.sapo.edu.entity.Role;
import com.sapo.edu.entity.compositekey.EmployeeRoleId;
import com.sapo.edu.entity.connectentity.EmployeeRole;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(EmployeeRole.class)
public abstract class EmployeeRole_ {

	public static volatile SingularAttribute<EmployeeRole, Role> role;
	public static volatile SingularAttribute<EmployeeRole, EmployeeRoleId> id;
	public static volatile SingularAttribute<EmployeeRole, Employee> employee;

	public static final String ROLE = "role";
	public static final String ID = "id";
	public static final String EMPLOYEE = "employee";

}

