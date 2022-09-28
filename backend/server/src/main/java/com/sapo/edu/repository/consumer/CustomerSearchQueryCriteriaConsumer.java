package com.sapo.edu.repository.consumer;

import com.sapo.edu.entity.Customer;
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
public class CustomerSearchQueryCriteriaConsumer implements Consumer<SearchCriteria> {
    private Predicate predicate;
    private CriteriaBuilder criteriaBuilder;
    private Root<Customer> root;

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
            if (param.getKey().equalsIgnoreCase(ConstKeywords.KEYWORD_SEARCH)) {
                Predicate keywordFilter = criteriaBuilder.disjunction();
                keywordFilter = criteriaBuilder.or(keywordFilter,
                        criteriaBuilder.like(root.<String>get("name"), "%" + param.getValue() + "%"));
                keywordFilter = criteriaBuilder.or(keywordFilter,
                        criteriaBuilder.like(root.<String>get("phone"), "%" + param.getValue() + "%"));
                keywordFilter = criteriaBuilder.or(keywordFilter,
                        criteriaBuilder.like(root.<String>get("address"), "%" + param.getValue() + "%"));

                predicate = criteriaBuilder.and(predicate, keywordFilter); // ;keyword==đạt;
            }
            else if (root.get(param.getKey()).getJavaType() == String.class)
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(root.get(param.getKey()), "%" + param.getValue() + "%")); // param.getKey() == phone (e.g: ;phone==77 71;)
        }

        predicate = criteriaBuilder.and(predicate, criteriaBuilder.isTrue(root.get("active")));
    }
}
