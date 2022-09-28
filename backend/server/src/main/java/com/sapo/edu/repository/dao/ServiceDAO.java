package com.sapo.edu.repository.dao;

import com.sapo.edu.entity.Service;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.repository.consumer.ServiceSearchQueryCriteriaConsumer;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

@Component
public class ServiceDAO {
    @PersistenceContext
    private EntityManager entityManager;

    public List<Service> searchService(List<SearchCriteria> params) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Service> cq = cb.createQuery(Service.class);
        Root<Service> root = cq.from(Service.class);

        Predicate predicate = cb.conjunction(); // true predicate by default

        ServiceSearchQueryCriteriaConsumer searchConsumer = new ServiceSearchQueryCriteriaConsumer(predicate, cb, root);
        params.stream().forEach(searchConsumer);
        predicate = searchConsumer.getPredicate();
        cq.where(predicate);

        List<Service> result = entityManager.createQuery(cq).getResultList();
        return result;
    }
}
