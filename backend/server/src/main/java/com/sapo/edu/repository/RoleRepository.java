package com.sapo.edu.repository;

import com.sapo.edu.common.ERole;
import com.sapo.edu.entity.Role;
import com.sapo.edu.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends BaseRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
