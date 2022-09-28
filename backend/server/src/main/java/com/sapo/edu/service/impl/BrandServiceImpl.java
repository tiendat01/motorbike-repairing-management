package com.sapo.edu.service.impl;

import com.sapo.edu.entity.Brand;
import com.sapo.edu.exception.DuplicateEntityException;
import com.sapo.edu.mapper.dto.BrandDTOMapper;
import com.sapo.edu.payload.crudrequest.BrandRequest;
import com.sapo.edu.repository.BrandRepository;
import com.sapo.edu.service.BrandService;
import com.sapo.edu.service.base.impl.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class BrandServiceImpl extends BaseServiceImpl<Brand> implements BrandService {
    @Autowired
    private BrandDTOMapper dtoMapper;
    @Autowired
    private BrandRepository brandRepository;

    protected BrandServiceImpl(BrandRepository brandRepository) {
        super(brandRepository);
    }

    @Override
    @Transactional
    public Brand save(Brand entity) {
        if (brandRepository.existsByBrandName(entity.getBrandName()))
            throw new DuplicateEntityException(BrandRequest.class, "brandName", entity.getBrandName());
        return super.save(entity);
    }

    @Override
    @Transactional
    public Brand updateById(Long id, Brand newEntity) {
        Brand oldEntity = this.findById(id);
        // this field cannot update
        newEntity.setId(oldEntity.getId());

        if (brandRepository.existsByBrandName(newEntity.getBrandName())) {
            Brand existed = brandRepository.findByBrandName(newEntity.getBrandName()).get();
            if (!existed.getId().equals(newEntity.getId()))
                throw new DuplicateEntityException(BrandRequest.class, "brandName", newEntity.getBrandName());
        }
        return super.updateById(id, newEntity);
    }

    @Override
    public Map<String, Object> findAllPaging(int page, int size) {

        Map<String, Object> response = super.findAllPaging(page, size);
        List<Brand> brands = (List<Brand>) response.get("listOfItems");
        response.put("listOfItems", dtoMapper.toBrandDTOs(brands));

        return response;
    }
}
