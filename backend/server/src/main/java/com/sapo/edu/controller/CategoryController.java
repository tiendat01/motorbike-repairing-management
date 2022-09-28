package com.sapo.edu.controller;

import com.sapo.edu.controller.base.BaseController;
import com.sapo.edu.mapper.dto.CategoryDTOMapper;
import com.sapo.edu.mapper.request.CategoryRequestMapper;
import com.sapo.edu.payload.crudrequest.CategoryRequest;
import com.sapo.edu.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/categories")
public class CategoryController implements BaseController<CategoryRequest> {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private CategoryDTOMapper dtoMapper;
    @Autowired
    private CategoryRequestMapper requestMapper;

    @Override
    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> all() {
        return ResponseEntity.ok().body(dtoMapper.toCategoryDTOs(categoryService.findAll()));
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> one(Long id) {
        return ResponseEntity
                .ok()
                .body(dtoMapper.toCategoryDTO(categoryService.findById(id)));
    }

    @Override
    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> create(CategoryRequest entity) {
        return ResponseEntity
                .ok()
                .body(dtoMapper.toCategoryDTO(categoryService.save(requestMapper.toCategory(entity))));
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> update(CategoryRequest entity, Long id) {
        return ResponseEntity
                .ok()
                .body(dtoMapper.toCategoryDTO(categoryService.updateById(id, requestMapper.toCategory(entity))));
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(Long id) {
        categoryService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


    @Override
    @GetMapping("/paging")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> all(int page, int size) {
        return ResponseEntity.ok(categoryService.findAllPaging(page, size));
    }
}
