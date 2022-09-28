package com.sapo.edu.repository.consumer;

import com.sapo.edu.entity.Brand;
import com.sapo.edu.entity.Category;
import com.sapo.edu.entity.Model;
import com.sapo.edu.entity.Product;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.repository.CategoryRepository;
import com.sapo.edu.repository.ModelRepository;
import com.sapo.edu.service.BrandService;
import com.sapo.edu.service.CategoryService;
import com.sapo.edu.service.ModelService;
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
public class ProductSearchQueryCriteriaConsumer implements Consumer<SearchCriteria> {
    private Predicate predicate;
    private CriteriaBuilder criteriaBuilder;
    private Root<Product> root;
    private CategoryService categoryService;
    private ModelService modelService;
    private BrandService brandService;

    @Override
    public void accept(SearchCriteria param) {
        if (param.getOperation().equalsIgnoreCase(">=")) {
            predicate = criteriaBuilder.and(predicate,
                    criteriaBuilder.greaterThanOrEqualTo(root.get(param.getKey()), param.getValue().toString()));
        } else if (param.getOperation().equalsIgnoreCase("<=")) {
            predicate = criteriaBuilder.and(predicate,
                    criteriaBuilder.lessThanOrEqualTo(root.get(param.getKey()), param.getValue().toString()));
        } else if (param.getOperation().equalsIgnoreCase("==")) {
            switch (param.getKey()) {
                case ConstKeywords.KEYWORD_SEARCH:
                    Predicate keywordFilter = criteriaBuilder.disjunction(); // false predicate by default
                    keywordFilter = criteriaBuilder.or(keywordFilter,
                            criteriaBuilder.like(root.<String>get("code"), "%" + param.getValue() + "%"));
                    keywordFilter = criteriaBuilder.or(keywordFilter,
                            criteriaBuilder.like(root.<String>get("name"), "%" + param.getValue() + "%"));
                    predicate = criteriaBuilder.and(predicate, keywordFilter); // ;keyword==đạt;
                    break;

                case "brand":
                    Long brandId = Long.parseLong(param.getValue().toString());
                    Brand brand = brandService.findById(brandId);
                    Predicate orPredicate = criteriaBuilder.disjunction();
                    for (var model : brand.getModels()) {
                        orPredicate = criteriaBuilder.or(orPredicate,
                                criteriaBuilder.isMember(model, root.get("models")));
                    }
                    predicate = criteriaBuilder.and(predicate, orPredicate); // ;brand==2;
                    break;
                case "category":
                    Long categoryId = Long.parseLong(param.getValue().toString());
                    Category category = categoryService.findById(categoryId);
                    predicate = criteriaBuilder.and(predicate,
                            criteriaBuilder.equal(root.get("category"), category)); // ;category==1;
                    break;
                case "name":
                    predicate = criteriaBuilder.and(predicate,
                            criteriaBuilder.like(root.get(param.getKey()), "%" + param.getValue() + "%")); // ;name==phuộc;
                default:
                    break;
            }

        } else if (param.getOperation().equalsIgnoreCase(":")) {
            Long modelId = Long.parseLong(param.getValue().toString());
            Model model = modelService.findById(modelId);
            predicate = criteriaBuilder.and(predicate,
                    criteriaBuilder.isMember(model, root.get("models"))); // ;models:1;
        }

        predicate = criteriaBuilder.and(predicate, criteriaBuilder.isTrue(root.get("active")));
    }
}
