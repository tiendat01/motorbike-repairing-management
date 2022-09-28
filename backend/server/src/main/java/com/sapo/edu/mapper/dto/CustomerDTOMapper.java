package com.sapo.edu.mapper.dto;

import com.sapo.edu.dto.CustomerDTO;
import com.sapo.edu.entity.Customer;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
//Convert entiry -> DTO
@Component
public class CustomerDTOMapper {
    @Autowired
    private ModelMapper mapper;

    public CustomerDTO toCustomerDTO(Customer customer) {
        return mapper.map(customer, CustomerDTO.class);
    }

    public List<CustomerDTO> toCustomerDTOs(List<Customer> customers) {
        return customers
                .stream()
                .map(this::toCustomerDTO)
                .collect(Collectors.toList());
    }
}
