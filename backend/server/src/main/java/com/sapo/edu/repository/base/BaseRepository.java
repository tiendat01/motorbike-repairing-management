package com.sapo.edu.repository.base;

import com.sapo.edu.entity.base.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

//@NoRepositoryBean
public interface BaseRepository<T extends BaseEntity, Long> extends JpaRepository<T, Long> {
}
