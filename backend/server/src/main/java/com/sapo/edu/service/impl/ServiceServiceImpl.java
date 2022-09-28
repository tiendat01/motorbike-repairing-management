package com.sapo.edu.service.impl;

import com.sapo.edu.entity.Service;
import com.sapo.edu.exception.EntityNotFoundException;
import com.sapo.edu.mapper.dto.ServiceDTOMapper;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.repository.ServiceRepository;
import com.sapo.edu.repository.dao.ServiceDAO;
import com.sapo.edu.service.ServiceService;
import com.sapo.edu.service.base.impl.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class ServiceServiceImpl extends BaseServiceImpl<Service> implements ServiceService {
    @Autowired
    private ServiceDTOMapper dtoMapper;
    @Autowired
    private ServiceDAO serviceDAO;
    @Autowired
    private ServiceRepository serviceRepository;

    protected ServiceServiceImpl(ServiceRepository serviceRepository) {
        super(serviceRepository);
    }


    // READ
    @Override
    public List<Service> findAll() {
        return super.findAll().stream().filter((item -> item.getActive())).collect(Collectors.toList());
    }
    @Override
    public Service findById(Long id) {
        Service service = super.findById(id);
        if (!service.getActive())
            throw new EntityNotFoundException(Service.class, "Service", id.toString());
        return service;
    }
    @Override
    public Map<String, Object> findAllPaging(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Service> itemsPerPage = serviceRepository.findByActive(true, pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("currentPage", itemsPerPage.getNumber());
        response.put("totalPages", itemsPerPage.getTotalPages());
        response.put("totalItems", itemsPerPage.getTotalElements());
        response.put("listOfItems", dtoMapper.toServiceDTOs(itemsPerPage.getContent()));

        return response;
    }


    // CREATE
    @Override
    @Transactional
    public Service save(Service entity) {
        entity.setCreatedDate(LocalDateTime.now());
        entity.setUpdatedDate(LocalDateTime.now());
        entity.setActive(true);
        return super.save(entity);
    }

    // UPDATE
    @Override
    @Transactional
    public Service updateById(Long id, Service newEntity) {
        Service oldEntity = this.findById(id);
        // these fields cannot update
        newEntity.setId(oldEntity.getId());
        newEntity.setCode(oldEntity.getCode());
        newEntity.setCreatedDate(oldEntity.getCreatedDate());

        newEntity.setUpdatedDate(LocalDateTime.now());
        newEntity.setActive(true);
        return serviceRepository.save(newEntity);
    }


    // DELETE
    @Override
    @Transactional
    public void deleteByIdTmp(Long serviceId) {
        Service service = this.findById(serviceId);

        service.setActive(false);
        service.setUpdatedDate(LocalDateTime.now());
        serviceRepository.save(service);
    }
    @Override
    @Transactional
    public void deleteByIdArrayTmp(List<Long> serviceIds) {
        serviceIds.stream().forEach((serviceId) -> this.deleteByIdTmp(serviceId));
    }

    @Override
    public List<Service> searchService(List<SearchCriteria> params) {
        return serviceDAO.searchService(params);
    }
}
