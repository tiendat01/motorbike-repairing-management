package com.sapo.edu.repository;

import com.sapo.edu.entity.Brand;
import com.sapo.edu.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BrandRepository extends BaseRepository<Brand, Long> {
    boolean existsByBrandName(String brandName);
    Optional<Brand> findByBrandName(String brandName);
}
