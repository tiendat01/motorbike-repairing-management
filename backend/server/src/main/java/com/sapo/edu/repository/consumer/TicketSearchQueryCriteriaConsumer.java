package com.sapo.edu.repository.consumer;

import com.sapo.edu.common.DateConverter;
import com.sapo.edu.entity.Customer;
import com.sapo.edu.entity.Motorbike;
import com.sapo.edu.entity.Ticket;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.function.Consumer;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TicketSearchQueryCriteriaConsumer implements Consumer<SearchCriteria> {
    private Predicate predicate;
    private CriteriaBuilder criteriaBuilder;
    private Root<Ticket> root;
    private Join<Ticket, Customer> join;

    @Override
    public void accept(SearchCriteria param) {
        if (param.getOperation().equalsIgnoreCase(">=")) {
            predicate = criteriaBuilder.and(predicate,
                    criteriaBuilder.greaterThanOrEqualTo(
                            root.get("updatedDate"), DateConverter.toLocalDateTime(param.getValue().toString()))); // date>=2022-09-15
        } else if (param.getOperation().equalsIgnoreCase("<=")) {
            predicate = criteriaBuilder.and(predicate,
                    criteriaBuilder.lessThanOrEqualTo(
                            root.get("updatedDate"), DateConverter.toLocalDateTime(param.getValue().toString()).plusDays(1))); // date<=2022-09-15
        } else if (param.getOperation().equalsIgnoreCase("==")) {
            switch (param.getKey()) {
                case ConstKeywords.KEYWORD_SEARCH:
                    Predicate keywordFilter = criteriaBuilder.disjunction(); // false predicate by default
                    keywordFilter = criteriaBuilder.or(keywordFilter,
                            criteriaBuilder.like(root.<String>get("code"), "%" + param.getValue() + "%"));
                    keywordFilter = criteriaBuilder.or(keywordFilter,
                            criteriaBuilder.like(root.<Motorbike>get("motorbike").<String>get("licensePlates"), "%" + param.getValue() + "%")); // keyword in licensePlates of motorbike
                    keywordFilter = criteriaBuilder.or(keywordFilter,
                            criteriaBuilder.like(join.<String>get("phone"), "%" + param.getValue() + "%")); // keyword in phone of customer
                    predicate = criteriaBuilder.and(predicate, keywordFilter); // ;keyword==đạt;
                    break;
                case "motorbike":
                    predicate = criteriaBuilder.and(predicate,
                            criteriaBuilder.like(
                                    root.<Motorbike>get(param.getKey()).<String>get("licensePlates"), "%" + param.getValue() + "%")); // ;motorbike==992;
                    break;
                case "status":
                    Byte reqStatus = Byte.valueOf(param.getValue().toString());
                    predicate = criteriaBuilder.and(predicate,
                            criteriaBuilder.equal(root.get(param.getKey()), reqStatus)); // ;status==4;
                default:
                    break;
            }
        }

        predicate = criteriaBuilder.and(predicate, criteriaBuilder.isTrue(root.get("active")));

    }
}
