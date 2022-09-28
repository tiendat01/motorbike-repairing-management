package com.sapo.edu.mapper.request;

import com.sapo.edu.common.RandomCodeGenerator;
import com.sapo.edu.entity.Service;
import com.sapo.edu.payload.crudrequest.ServiceRequest;
import com.sapo.edu.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ServiceRequestMapper {
    @Autowired
    private ServiceRepository serviceRepository;

    public Service toService(ServiceRequest serviceRequest) {
        Service service = new Service();
        String code;
        do {
            code = RandomCodeGenerator.genCode("DV", 3, false, true);
        } while (serviceRepository.existsByCode(code));

        service.setCode(code);
        service.setName(serviceRequest.getName());
        service.setPrice(serviceRequest.getPrice());
        service.setDescription(serviceRequest.getDescription());

        return service;
    }
}
