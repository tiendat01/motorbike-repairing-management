package com.sapo.edu.annotations.com.sapo.edu.entity;

import com.sapo.edu.annotations.com.sapo.edu.entity.base.BaseEntity_;
import com.sapo.edu.entity.Brand;
import com.sapo.edu.entity.Model;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Brand.class)
public abstract class Brand_ extends BaseEntity_ {

	public static volatile SetAttribute<Brand, Model> models;
	public static volatile SingularAttribute<Brand, String> brandName;

	public static final String MODELS = "models";
	public static final String BRAND_NAME = "brandName";

}

