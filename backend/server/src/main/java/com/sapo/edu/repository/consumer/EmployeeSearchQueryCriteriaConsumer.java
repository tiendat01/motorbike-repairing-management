package com.sapo.edu.repository.consumer;

import com.sapo.edu.common.ERole;
import com.sapo.edu.entity.Employee;
import com.sapo.edu.entity.Role;
import com.sapo.edu.exception.EntityNotFoundException;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.repository.RoleRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Root;
import java.util.function.Consumer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.persistence.criteria.Predicate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmployeeSearchQueryCriteriaConsumer implements Consumer<SearchCriteria> {

    private Predicate predicate;
    private CriteriaBuilder criteriaBuilder;
    private Root<Employee> root;
    private RoleRepository roleRepository;

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
            if (param.getKey().equalsIgnoreCase(ConstKeywords.KEYWORD_SEARCH)) { // search keyword by: name, phone, code, address
                Predicate keywordFilter = criteriaBuilder.disjunction(); // false predicate by default
                keywordFilter = criteriaBuilder.or(keywordFilter,
                        criteriaBuilder.like(root.<String>get("code"), "%" + param.getValue() + "%"));
                keywordFilter = criteriaBuilder.or(keywordFilter,
                        criteriaBuilder.like(root.<String>get("name"), "%" + param.getValue() + "%"));
                keywordFilter = criteriaBuilder.or(keywordFilter,
                        criteriaBuilder.like(root.<String>get("phone"), "%" + param.getValue() + "%"));
                keywordFilter = criteriaBuilder.or(keywordFilter,
                        criteriaBuilder.like(root.<String>get("address"), "%" + param.getValue() + "%"));

                predicate = criteriaBuilder.and(predicate, keywordFilter); // ;keyword==đạt;
            }

            else if (root.get(param.getKey()).getJavaType() == Boolean.class) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.equal(root.get(param.getKey()), Boolean.valueOf(param.getValue().toString()))); // ;available==true; or ;workingStatus==true;
            }
            else if (root.get(param.getKey()).getJavaType() == String.class) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(root.get(param.getKey()), "%" + param.getValue() + "%"));
            }
            else {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.equal(root.get(param.getKey()), param.getValue()));
            }
        }
        else if (param.getOperation().equalsIgnoreCase(":")) { // ;roles:mechanic,admin,cashier,moderator;
            Pattern pattern = Pattern.compile("(\\w*?),");
            Matcher matcher = pattern.matcher(param.getValue().toString() + ","); // add "," for the last item to be matched
            Predicate orPredicate = criteriaBuilder.disjunction(); // false predicate by default
            while (matcher.find()) {
                String roleName = matcher.group(1);
                Role role;
                switch (roleName) {
                    case "moderator":
                        role = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new EntityNotFoundException(Role.class, "role", ERole.ROLE_MODERATOR.name()));
                        break;
                    case "mechanic":
                        role = roleRepository.findByName(ERole.ROLE_MECHANIC)
                                .orElseThrow(() -> new EntityNotFoundException(Role.class, "role", ERole.ROLE_MECHANIC.name()));
                        break;
                    case "admin":
                        role = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new EntityNotFoundException(Role.class, "role", ERole.ROLE_ADMIN.name()));
                        break;
                    case "cashier":
                        role = roleRepository.findByName(ERole.ROLE_CASHIER)
                                .orElseThrow(() -> new EntityNotFoundException(Role.class, "role", ERole.ROLE_CASHIER.name()));
                        break;
                    default:
                        throw new EntityNotFoundException(Role.class, "roleName", roleName);
                }
                orPredicate = criteriaBuilder.or(orPredicate, criteriaBuilder.isMember(role, root.get("roles")));
            }
            predicate = criteriaBuilder.and(predicate, orPredicate);
        }

        predicate = criteriaBuilder.and(predicate, criteriaBuilder.isTrue(root.get("active")));

    }
}
