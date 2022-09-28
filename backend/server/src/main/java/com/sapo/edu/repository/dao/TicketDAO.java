package com.sapo.edu.repository.dao;

import com.sapo.edu.annotations.com.sapo.edu.entity.Ticket_;
import com.sapo.edu.entity.Customer;
import com.sapo.edu.entity.Product;
import com.sapo.edu.entity.Ticket;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.repository.consumer.TicketSearchQueryCriteriaConsumer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;
import java.util.List;

@Component
public class TicketDAO {
    @PersistenceContext
    private EntityManager entityManager;

    public List<Ticket> searchTicket(List<SearchCriteria> params) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        Metamodel m = entityManager.getMetamodel();

        CriteriaQuery<Ticket> cq = cb.createQuery(Ticket.class);
        Root<Ticket> root = cq.from(Ticket.class);

        Join<Ticket, Customer> nullableCustomer = root.join(Ticket_.CUSTOMER, JoinType.LEFT);

        Predicate predicate = cb.conjunction(); // true predicate by default

        TicketSearchQueryCriteriaConsumer searchConsumer = new TicketSearchQueryCriteriaConsumer(predicate, cb, root, nullableCustomer);
        params.stream().forEach(searchConsumer);
        predicate = searchConsumer.getPredicate();
        cq.where(predicate);

        List<Ticket> result = entityManager.createQuery(cq).getResultList();
        return result;
    }

    public Page<Ticket> searchTicketPaging(List<SearchCriteria> params, Pageable pageable) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Ticket> cq = cb.createQuery(Ticket.class);
        Root<Ticket> root = cq.from(Ticket.class);

        Predicate predicate = cb.conjunction(); // true predicate by default

        TicketSearchQueryCriteriaConsumer searchConsumer = new TicketSearchQueryCriteriaConsumer(predicate, cb, root, null);
        params.stream().forEach(searchConsumer);
        predicate = searchConsumer.getPredicate();
        cq.where(predicate);

        // fetch Tickets per Page limit
        List<Ticket> result = entityManager.createQuery(cq)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();
        // create count query
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<Ticket> countRoot = countQuery.from(Ticket.class);
        countQuery.select(cb.count(countRoot)).where(predicate);
        // fetch the count of all tickets as per given criteria
        Long count = entityManager.createQuery(countQuery).getSingleResult();

        return new PageImpl<>(result, pageable, count);
    }
}
