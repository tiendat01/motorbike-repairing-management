package com.sapo.edu.service.impl;

import com.sapo.edu.entity.Employee;
import com.sapo.edu.entity.Product;
import com.sapo.edu.exception.EntityNotFoundException;
import com.sapo.edu.mapper.dto.ProductDTOMapper;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.repository.ProductRepository;
import com.sapo.edu.repository.dao.ProductDAO;
import com.sapo.edu.service.ProductService;
import com.sapo.edu.service.base.impl.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl extends BaseServiceImpl<Product> implements ProductService {
    @Autowired
    private ProductDTOMapper dtoMapper;
    @Autowired
    private ProductDAO productDAO;
    @Autowired
    private ProductRepository productRepository;
    public ProductServiceImpl(ProductRepository productRepository) {
        super(productRepository);
    }

    // READ
    @Override
    public List<Product> findAll() {
        return super.findAll().stream().filter((item -> item.getActive())).collect(Collectors.toList());
    }
    @Override
    public Product findById(Long id) {
        Product product = super.findById(id);
        if (!product.getActive())
            throw new EntityNotFoundException(Product.class, "Product", id.toString());
        return product;
    }
    @Override
    public Map<String, Object> findAllPaging(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> itemsPerPage = productRepository.findByActive(true, pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("currentPage", itemsPerPage.getNumber());
        response.put("totalPages", itemsPerPage.getTotalPages());
        response.put("totalItems", itemsPerPage.getTotalElements());
        response.put("listOfItems", dtoMapper.toProductDTOs(itemsPerPage.getContent()));

        return response;
    }


    // CREATE
    @Override
    @Transactional
    public Product save(Product newEntity) {
        newEntity.setCreatedDate(LocalDateTime.now());
        newEntity.setUpdatedDate(LocalDateTime.now());
        newEntity.setActive(true);
        return super.save(newEntity);
    }


    // UPDATE
    @Override
    @Transactional
    public Product updateById(Long id, Product newEntity) {
        Product oldEntity = this.findById(id);
        // this field cannot update
        newEntity.setId(oldEntity.getId());
        newEntity.setCode(oldEntity.getCode());
        newEntity.setCreatedDate(oldEntity.getCreatedDate());
        newEntity.setUpdatedDate(LocalDateTime.now());
        newEntity.setActive(true);

        return productRepository.save(newEntity);
    }



    // DELETE
    @Override
    @Transactional
    public void deleteByIdTmp(Long productId) {
        Product product = this.findById(productId);

        product.setActive(false);
        product.setUpdatedDate(LocalDateTime.now());
        productRepository.save(product);
    }
    @Override
    @Transactional
    public void deleteByIdArrayTmp(List<Long> productIds) {
        productIds.stream().forEach((productId) -> this.deleteByIdTmp(productId));
    }


    // FILTER
    @Override
    public List<Product> searchProduct(List<SearchCriteria> params) {
        return productDAO.searchProduct(params);
    }
}
