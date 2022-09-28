package com.sapo.edu.mapper.request;

import com.sapo.edu.entity.Brand;
import com.sapo.edu.payload.crudrequest.BrandRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BrandRequestMapper {
    @Autowired
    private ModelMapper mapper;
    
    public Brand toBrand(BrandRequest brandRequest) {
        return mapper.map(brandRequest, Brand.class);
    }

}
