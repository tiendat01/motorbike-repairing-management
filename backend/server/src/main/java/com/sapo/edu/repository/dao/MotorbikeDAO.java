package com.sapo.edu.repository.dao;

import com.sapo.edu.entity.Motorbike;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.repository.consumer.MotorbikeSearchQueryCriteriaConsumer;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

@Component
public class MotorbikeDAO {
    @PersistenceContext
    private EntityManager entityManager;

    public List<Motorbike> searchMotorbike(List<SearchCriteria> params) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Motorbike> cq = cb.createQuery(Motorbike.class);
        Root<Motorbike> root = cq.from(Motorbike.class);

        Predicate predicate = cb.conjunction(); // true predicate by default

        MotorbikeSearchQueryCriteriaConsumer searchConsumer = new MotorbikeSearchQueryCriteriaConsumer(predicate, cb, root);
        params.stream().forEach(searchConsumer);
        predicate = searchConsumer.getPredicate();
        cq.where(predicate);

        List<Motorbike> result = entityManager.createQuery(cq).getResultList();
        return result;
    }
}
