package com.sapo.edu.annotations.com.sapo.edu.entity.connectentity;

import com.sapo.edu.entity.Model;
import com.sapo.edu.entity.Product;
import com.sapo.edu.entity.compositekey.ProductModelId;
import com.sapo.edu.entity.connectentity.ProductModel;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(ProductModel.class)
public abstract class ProductModel_ {

	public static volatile SingularAttribute<ProductModel, Product> product;
	public static volatile SingularAttribute<ProductModel, Model> model;
	public static volatile SingularAttribute<ProductModel, ProductModelId> id;

	public static final String PRODUCT = "product";
	public static final String MODEL = "model";
	public static final String ID = "id";

}

