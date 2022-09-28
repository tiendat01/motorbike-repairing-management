package com.sapo.edu.repository;

import com.sapo.edu.entity.Employee;
import com.sapo.edu.entity.Model;
import com.sapo.edu.entity.Product;
import com.sapo.edu.repository.base.BaseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;
@Repository
public interface ProductRepository extends BaseRepository<Product,Long> {
    boolean existsByCode(String code);
    List<Product> findProductsByModelsId(Long modelId);
    Page<Product> findByActive(boolean active, Pageable pageable);

}
