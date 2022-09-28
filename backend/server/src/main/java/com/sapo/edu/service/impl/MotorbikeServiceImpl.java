package com.sapo.edu.service.impl;

import com.sapo.edu.entity.Motorbike;
import com.sapo.edu.entity.Ticket;
import com.sapo.edu.exception.DuplicateEntityException;
import com.sapo.edu.mapper.dto.MotorbikeDTOMapper;
import com.sapo.edu.payload.crudrequest.MotorbikeRequest;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.repository.MotorbikeRepository;
import com.sapo.edu.repository.TicketRepository;
import com.sapo.edu.repository.dao.MotorbikeDAO;
import com.sapo.edu.service.MotorbikeService;
import com.sapo.edu.service.base.impl.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class MotorbikeServiceImpl extends BaseServiceImpl<Motorbike> implements MotorbikeService {

    @Autowired
    private MotorbikeDTOMapper dtoMapper;
    @Autowired
    private MotorbikeRepository motorbikeRepository;
    @Autowired
    private MotorbikeDAO motorbikeDAO;
    @Autowired
    private TicketRepository ticketRepository;

    protected MotorbikeServiceImpl(MotorbikeRepository motorbikeRepository) {
        super(motorbikeRepository);
    }

    @Override
    @Transactional
    public Motorbike save(Motorbike newEntity) {
        if (motorbikeRepository.existsByLicensePlates(newEntity.getLicensePlates()))
            throw new DuplicateEntityException(MotorbikeRequest.class, "Biển số xe", newEntity.getLicensePlates());
        return super.save(newEntity);
    }

    @Override
    public Motorbike updateById(Long id, Motorbike newEntity) {
        Motorbike oldEntity = this.findById(id);
        // this field cannot update
        newEntity.setId(oldEntity.getId());

        if (motorbikeRepository.existsByLicensePlates(newEntity.getLicensePlates())) {
            Motorbike existed = motorbikeRepository
                    .findByLicensePlates(newEntity.getLicensePlates()).get();
            if (!existed.getId().equals(newEntity.getId()))
                throw new DuplicateEntityException(MotorbikeRequest.class, "Biển số xe", newEntity.getLicensePlates());
        }
        return super.updateById(id, newEntity);
    }

    @Override
    public Map<String, Object> findAllPaging(int page, int size) {
        Map<String, Object> response = super.findAllPaging(page, size);
        List<Motorbike> motorbikes = (List<Motorbike>) response.get("listOfItems");
        response.put("listOfItems", dtoMapper.toMotorbikeDTOs(motorbikes));

        return response;
    }

    @Override
    public List<Motorbike> searchMotorbike(List<SearchCriteria> params) {
        return motorbikeDAO.searchMotorbike(params);
    }


    @Override
    public List<Ticket> findAllTicket(Long motorbikeId) {
        return ticketRepository.findByMotorbike(this.findById(motorbikeId));
    }
}
