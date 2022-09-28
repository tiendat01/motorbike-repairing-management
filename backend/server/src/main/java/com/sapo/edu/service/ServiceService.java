package com.sapo.edu.service;


import com.sapo.edu.entity.Service;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.service.base.BaseService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

// this name is so bad :(((
public interface ServiceService extends BaseService<Service> {
    // DELETE
    @Transactional
    void deleteByIdTmp(Long serviceId);

    @Transactional
    void deleteByIdArrayTmp(List<Long> serviceIds);

    List<Service> searchService(List<SearchCriteria> params);
}
