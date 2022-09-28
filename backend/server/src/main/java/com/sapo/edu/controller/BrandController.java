package com.sapo.edu.controller;

import com.sapo.edu.controller.base.BaseController;
import com.sapo.edu.mapper.dto.BrandDTOMapper;
import com.sapo.edu.mapper.request.BrandRequestMapper;
import com.sapo.edu.payload.crudrequest.BrandRequest;
import com.sapo.edu.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/brands")
public class BrandController implements BaseController<BrandRequest> {

    @Autowired
    private BrandService brandService;
    @Autowired
    private BrandDTOMapper dtoMapper;
    @Autowired
    private BrandRequestMapper requestMapper;

    @Override
    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> all() {
        return ResponseEntity.ok().body(dtoMapper.toBrandDTOs(brandService.findAll()));
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> one(Long id) {
        return ResponseEntity
                .ok()
                .body(dtoMapper.toBrandDTO(brandService.findById(id)));
    }

    @Override
    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> create(BrandRequest entity) {
        return ResponseEntity
                .ok()
                .body(dtoMapper.toBrandDTO(brandService.save(requestMapper.toBrand(entity))));
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> update(BrandRequest entity, Long id) {
        return ResponseEntity
                .ok()
                .body(dtoMapper.toBrandDTO(brandService.updateById(id, requestMapper.toBrand(entity))));
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> delete(Long id) {
        brandService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


    @Override
    @GetMapping("/paging")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> all(int page, int size) {
        return ResponseEntity.ok(brandService.findAllPaging(page, size));
    }
}
