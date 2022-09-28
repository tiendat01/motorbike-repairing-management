package com.sapo.edu.repository.dao;

import com.sapo.edu.entity.Product;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.repository.consumer.ProductSearchQueryCriteriaConsumer;
import com.sapo.edu.service.BrandService;
import com.sapo.edu.service.CategoryService;
import com.sapo.edu.service.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

@Component
public class ProductDAO {
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private ModelService modelService;
    @Autowired
    private BrandService brandService;

    public List<Product> searchProduct(List<SearchCriteria> params) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Product> cq = cb.createQuery(Product.class);
        Root<Product> root = cq.from(Product.class);

        Predicate predicate = cb.conjunction(); // true predicate by default

        ProductSearchQueryCriteriaConsumer searchConsumer = new ProductSearchQueryCriteriaConsumer(predicate, cb, root, categoryService, modelService, brandService);
        params.stream().forEach(searchConsumer);
        predicate = searchConsumer.getPredicate();
        cq.where(predicate);

        List<Product> result = entityManager.createQuery(cq).getResultList();
        return result;
    }
}
