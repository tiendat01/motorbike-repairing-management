package com.sapo.edu.repository.dao;

import com.sapo.edu.entity.Model;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.repository.BrandRepository;
import com.sapo.edu.repository.consumer.ModelSearchQueryCriteriaConsumer;
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
public class ModelDAO {
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private BrandRepository brandRepository;

    public List<Model> searchModel(List<SearchCriteria> params) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Model> cq = cb.createQuery(Model.class);
        Root<Model> root = cq.from(Model.class);

        Predicate predicate = cb.conjunction(); // true predicate by default

        ModelSearchQueryCriteriaConsumer searchConsumer = new ModelSearchQueryCriteriaConsumer(predicate, cb, root, brandRepository);
        params.stream().forEach(searchConsumer);
        predicate = searchConsumer.getPredicate();
        cq.where(predicate);

        List<Model> result = entityManager.createQuery(cq).getResultList();
        return result;
    }
}
