package com.sapo.edu.service;

import com.sapo.edu.entity.Model;
import com.sapo.edu.entity.Motorbike;
import com.sapo.edu.entity.Ticket;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.service.base.BaseService;

import java.util.List;

public interface MotorbikeService extends BaseService<Motorbike> {

    List<Motorbike> searchMotorbike(List<SearchCriteria> params);

    List<Ticket> findAllTicket(Long motorbikeId);
}
