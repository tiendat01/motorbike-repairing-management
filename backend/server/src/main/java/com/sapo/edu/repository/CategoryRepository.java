package com.sapo.edu.repository;

import com.sapo.edu.entity.Category;
import com.sapo.edu.entity.Customer;
import com.sapo.edu.repository.base.BaseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CategoryRepository extends BaseRepository<Category,Long> {
    boolean existsByCode(String code);
}
