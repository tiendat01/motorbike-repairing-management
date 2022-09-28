package com.sapo.edu.annotations.com.sapo.edu.entity;

import com.sapo.edu.annotations.com.sapo.edu.entity.base.BaseEntity_;
import com.sapo.edu.entity.Brand;
import com.sapo.edu.entity.Model;
import com.sapo.edu.entity.Motorbike;
import com.sapo.edu.entity.Product;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Model.class)
public abstract class Model_ extends BaseEntity_ {

	public static volatile SingularAttribute<Model, String> modelName;
	public static volatile SetAttribute<Model, Motorbike> motorbikes;
	public static volatile SingularAttribute<Model, Brand> brand;
	public static volatile SetAttribute<Model, Product> products;

	public static final String MODEL_NAME = "modelName";
	public static final String MOTORBIKES = "motorbikes";
	public static final String BRAND = "brand";
	public static final String PRODUCTS = "products";

}

