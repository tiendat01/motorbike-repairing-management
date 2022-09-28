package com.sapo.edu.annotations.com.sapo.edu.entity.compositekey;

import com.sapo.edu.entity.compositekey.ProductModelId;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(ProductModelId.class)
public abstract class ProductModelId_ {

	public static volatile SingularAttribute<ProductModelId, Long> productId;
	public static volatile SingularAttribute<ProductModelId, Long> modelId;

	public static final String PRODUCT_ID = "productId";
	public static final String MODEL_ID = "modelId";

}

