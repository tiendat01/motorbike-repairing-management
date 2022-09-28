package com.sapo.edu.mapper.dto;

import com.sapo.edu.dto.ProductDTO;
import com.sapo.edu.dto.connectDTO.TicketProductDTO;
import com.sapo.edu.entity.Product;
import com.sapo.edu.entity.connectentity.TicketProduct;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class TicketProductDTOMapper {
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private ProductDTOMapper productDTOMapper;

    public TicketProductDTO toTicketProductDTO(TicketProduct ticketProduct) {
        TypeMap<TicketProduct, TicketProductDTO> propertyMapper =
                this.mapper.getTypeMap(TicketProduct.class, TicketProductDTO.class) == null ?
                        this.mapper.createTypeMap(TicketProduct.class, TicketProductDTO.class) :
                        this.mapper.getTypeMap(TicketProduct.class, TicketProductDTO.class);
        propertyMapper.addMapping(TicketProduct::getPrice, TicketProductDTO::setStockPrice)
                .addMappings(mapper -> {
                    mapper.using(context -> productDTOMapper.toProductDTO((Product) context.getSource()))
                            .map(TicketProduct::getProduct, TicketProductDTO::setProduct);
                    mapper.map(TicketProduct::getPrice, TicketProductDTO::setStockPrice);
                });
        return this.mapper.map(ticketProduct, TicketProductDTO.class);
    }

    public Set<TicketProductDTO> toTicketProductDTOs(Set<TicketProduct> ticketProducts) {
        return ticketProducts.stream()
                .map(this::toTicketProductDTO)
                .collect(Collectors.toSet());
    }
}
