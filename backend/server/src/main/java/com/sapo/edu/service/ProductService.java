package com.sapo.edu.service;

import com.sapo.edu.entity.Product;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.service.base.BaseService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProductService extends BaseService<Product> {
    // DELETE
    @Transactional
    void deleteByIdTmp(Long productId);

    @Transactional
    void deleteByIdArrayTmp(List<Long> productIds);

    List<Product> searchProduct(List<SearchCriteria> params);
}
