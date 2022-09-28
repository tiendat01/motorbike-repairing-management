package com.sapo.edu.repository;

import com.sapo.edu.entity.Service;
import com.sapo.edu.repository.base.BaseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends BaseRepository<Service, Long> {
    boolean existsByCode(String code);
    Page<Service> findByActive(boolean active, Pageable pageable);
}
