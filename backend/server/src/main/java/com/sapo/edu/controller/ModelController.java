package com.sapo.edu.controller;

import com.sapo.edu.common.SearchParamParser;
import com.sapo.edu.controller.base.BaseController;
import com.sapo.edu.mapper.dto.ModelDTOMapper;
import com.sapo.edu.mapper.dto.ProductDTOMapper;
import com.sapo.edu.mapper.request.ModelRequestMapper;
import com.sapo.edu.mapper.request.SearchRequestMapper;
import com.sapo.edu.payload.connectrequest.ProductModelConnectRequest;
import com.sapo.edu.payload.crudrequest.ModelRequest;
import com.sapo.edu.service.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/models")
public class ModelController implements BaseController<ModelRequest> {

    @Autowired
    private ModelService modelService;
    @Autowired
    private ModelDTOMapper dtoMapper;
    @Autowired
    private ModelRequestMapper requestMapper;
    @Autowired
    private ProductDTOMapper productDTOMapper;
    @Autowired
    private SearchRequestMapper searchRequestMapper;
    @Autowired
    private SearchParamParser searchParamParser;

    @Override
    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> all() {
        return ResponseEntity.ok()
                .body(dtoMapper.toModelDTOs(modelService.findAll()));
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> one(Long id) {
        return ResponseEntity.ok()
                .body(dtoMapper.toModelDTO(modelService.findById(id)));
    }

    @Override
    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> create(ModelRequest entity) {
        return ResponseEntity.ok()
                .body(dtoMapper.toModelDTO(modelService.save(requestMapper.toModel(entity))));
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> update(ModelRequest entity, Long id) {
        return ResponseEntity.ok()
                .body(dtoMapper.toModelDTO(modelService.updateById(id, requestMapper.toModel(entity))));
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> delete(Long id) {
        modelService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Override
    @GetMapping("/paging")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> all(int page, int size) {
        return ResponseEntity.ok(modelService.findAllPaging(page, size));
    }


    // Many-to-Many relationship:
    @GetMapping("/{id}/products")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> allProductsByModelId(@PathVariable Long id) {
        return ResponseEntity.ok()
                .body(productDTOMapper.toProductDTOs(modelService.getAllProductsByModelsId(id)));
    }

    @PostMapping("/{id}/products")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> addProductToModel(@PathVariable(value = "id") Long modelId,
                                               @RequestBody ProductModelConnectRequest productId) {
        return ResponseEntity.ok()
                .body(productDTOMapper.toProductDTO(modelService.addProductToModel(productId.getProductId(), modelId)));
    }

    @DeleteMapping("/{id}/products/{productId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> deleteProductFromModel(@PathVariable(value = "id") Long modelId,
                                                    @PathVariable(value = "productId") Long productId) {
        modelService.deleteProductFromModel(productId, modelId);
        return ResponseEntity.noContent().build();
    }


    // filter
    @GetMapping("/f")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> search(@RequestParam(required = false, value = "search") String search) {
        return ResponseEntity.ok().body(
                dtoMapper.toModelDTOs(
                        modelService.searchModel(
                                searchRequestMapper.toSearchCriterias(
                                        searchParamParser.toSearchString(search))
                        )
                )
        );
    }
}
