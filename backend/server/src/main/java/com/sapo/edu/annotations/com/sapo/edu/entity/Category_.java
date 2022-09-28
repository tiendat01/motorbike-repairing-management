package com.sapo.edu.annotations.com.sapo.edu.entity;

import com.sapo.edu.annotations.com.sapo.edu.entity.base.BaseEntity_;
import com.sapo.edu.entity.Category;
import com.sapo.edu.entity.Product;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Category.class)
public abstract class Category_ extends BaseEntity_ {

	public static volatile SingularAttribute<Category, String> code;
	public static volatile SingularAttribute<Category, String> name;
	public static volatile SingularAttribute<Category, String> description;
	public static volatile SetAttribute<Category, Product> products;

	public static final String CODE = "code";
	public static final String NAME = "name";
	public static final String DESCRIPTION = "description";
	public static final String PRODUCTS = "products";

}

