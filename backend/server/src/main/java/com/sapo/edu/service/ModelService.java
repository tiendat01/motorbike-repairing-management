package com.sapo.edu.service;

import com.sapo.edu.entity.Model;
import com.sapo.edu.entity.Product;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.service.base.BaseService;

import java.util.List;

public interface ModelService extends BaseService<Model> {
    public List<Product> getAllProductsByModelsId(Long modelId);
    public void deleteProductFromModel(Long productId, Long modelId);
    public Product addProductToModel(Long productId, Long modelId);

    List<Model> searchModel(List<SearchCriteria> params);
}
