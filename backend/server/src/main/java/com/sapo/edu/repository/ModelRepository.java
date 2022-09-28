package com.sapo.edu.repository;

import com.sapo.edu.entity.Model;
import com.sapo.edu.entity.Product;
import com.sapo.edu.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModelRepository extends BaseRepository<Model, Long> {
    boolean existsByModelNameAndBrandId(String modelName, Long brandId);
    Optional<Model> findByModelNameAndBrandId(String modelName, Long brandId);

}
