package com.sapo.edu.mapper.dto;

import com.sapo.edu.dto.CategoryDTO;
import com.sapo.edu.entity.Category;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CategoryDTOMapper {
    @Autowired
    private ModelMapper mapper;

    public CategoryDTO toCategoryDTO(Category category) {
        return mapper.map(category, CategoryDTO.class);
    }
    public List<CategoryDTO> toCategoryDTOs(List<Category> categories) {
        return categories.stream()
                .map(this::toCategoryDTO)
                .collect(Collectors.toList());
    }
}
