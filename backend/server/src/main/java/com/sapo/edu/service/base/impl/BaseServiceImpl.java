package com.sapo.edu.service.base.impl;

import com.sapo.edu.entity.base.BaseEntity;
import com.sapo.edu.exception.EntityNotFoundException;
import com.sapo.edu.repository.base.BaseRepository;
import com.sapo.edu.service.base.BaseService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.ParameterizedType;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public abstract class BaseServiceImpl<T extends BaseEntity> implements BaseService<T> {

    private Class getGenericClass() {
        return ((Class<T>)
                ((ParameterizedType) getClass().getGenericSuperclass())
                        .getActualTypeArguments()[0]);
    }

    private final BaseRepository<T, Long> baseRepository;
    protected BaseServiceImpl(BaseRepository<T, Long> baseRepository) {
        this.baseRepository = baseRepository;
    }


    @Override
    public List<T> findAll() {
        return baseRepository.findAll();
    }

    @Override
    public T findById(Long id) {
        return baseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(getGenericClass(), "id", id.toString()));
    }

    @Override
    @Transactional
    public T save(T entity) {
        return baseRepository.save(entity);
    }

    // not good!
    @Override
    @Transactional
    public T updateById(Long id, T newEntity) {
        T oldEntity = this.findById(id);
        newEntity.setId(oldEntity.getId());
        return baseRepository.save(newEntity);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        Optional<T> optional = Optional.ofNullable(this.findById(id));
        optional.map(entity -> {
            baseRepository.deleteById(id);
            return id;
        })
                .orElseThrow(() -> new EntityNotFoundException(getGenericClass(), "id", id.toString()));
    }

    @Override
    public Map<String, Object> findAllPaging(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<T> itemsPerPage = baseRepository.findAll(pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("currentPage", itemsPerPage.getNumber());
        response.put("totalPages", itemsPerPage.getTotalPages());
        response.put("totalItems", itemsPerPage.getTotalElements());
        response.put("listOfItems", itemsPerPage.getContent());

        return response;
    }
}
