package com.sapo.edu.repository.consumer;

import com.sapo.edu.entity.Motorbike;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.function.Consumer;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MotorbikeSearchQueryCriteriaConsumer implements Consumer<SearchCriteria> {

    private Predicate predicate;
    private CriteriaBuilder criteriaBuilder;
    private Root<Motorbike> root;

    @Override
    public void accept(SearchCriteria param) {
        if (param.getOperation().equalsIgnoreCase(">=")) {
            predicate = criteriaBuilder.and(predicate,
                    criteriaBuilder.greaterThanOrEqualTo(root.get(param.getKey()), param.getValue().toString()));
        }
        else if (param.getOperation().equalsIgnoreCase("<=")) {
            predicate = criteriaBuilder.and(predicate,
                    criteriaBuilder.lessThanOrEqualTo(root.get(param.getKey()), param.getValue().toString()));
        }
        else if (param.getOperation().equalsIgnoreCase("==")) {
            predicate = criteriaBuilder.and(predicate,
                    criteriaBuilder.like(root.get(param.getKey()), "%" + param.getValue() + "%")); // param.getKey() == licensePlates
        }
    }
}
