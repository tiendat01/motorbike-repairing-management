package com.sapo.edu.annotations.com.sapo.edu.entity.compositekey;

import com.sapo.edu.entity.compositekey.EmployeeRoleId;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(EmployeeRoleId.class)
public abstract class EmployeeRoleId_ {

	public static volatile SingularAttribute<EmployeeRoleId, Long> roleId;
	public static volatile SingularAttribute<EmployeeRoleId, Long> employeeId;

	public static final String ROLE_ID = "roleId";
	public static final String EMPLOYEE_ID = "employeeId";

}

