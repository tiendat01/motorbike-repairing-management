package com.sapo.edu.mapper.request;

import com.sapo.edu.common.RandomCodeGenerator;
import com.sapo.edu.entity.Category;
import com.sapo.edu.payload.crudrequest.CategoryRequest;
import com.sapo.edu.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CategoryRequestMapper {
    @Autowired
    private CategoryRepository categoryRepository;

    public Category toCategory(CategoryRequest categoryRequest) {
        Category category = new Category();
        String code;
        do {
            code = RandomCodeGenerator.genCode("DM", 3, false, true);
        } while (categoryRepository.existsByCode(code));
        category.setCode(code);
        category.setName(categoryRequest.getName());
        category.setDescription(categoryRequest.getDescription());

        return category;
    }
}
