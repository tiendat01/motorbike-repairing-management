package com.sapo.edu.mapper.request;

import com.sapo.edu.entity.Brand;
import com.sapo.edu.entity.Model;
import com.sapo.edu.payload.crudrequest.ModelRequest;
import com.sapo.edu.repository.BrandRepository;
import com.sapo.edu.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ModelRequestMapper {
    @Autowired
    private BrandService brandService;
    @Autowired
    private BrandRepository brandRepository;

    public Model toModel(ModelRequest modelRequest) {
        Brand brand;
        Model newModel = new Model();
        if (!brandRepository.existsByBrandName(modelRequest.getBrandName())) {
            brand = new Brand();
            brand.setBrandName(modelRequest.getBrandName());
            brandService.save(brand);
        }
        else
            brand = brandRepository.findByBrandName(modelRequest.getBrandName()).get();

        newModel.setModelName(modelRequest.getModelName());
        newModel.setBrand(brand);
        return newModel;
    }
}
