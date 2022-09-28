package com.sapo.edu.mapper.dto;

import com.sapo.edu.dto.ServiceDTO;
import com.sapo.edu.entity.Service;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Component
public class ServiceDTOMapper {
    @Autowired
    private ModelMapper mapper;

    public ServiceDTO toServiceDTO(Service service) {

        TypeMap<Service, ServiceDTO> propertyMapper = mapper.getTypeMap(Service.class, ServiceDTO.class) == null ?
                mapper.createTypeMap(Service.class, ServiceDTO.class)
                :
                mapper.getTypeMap(Service.class, ServiceDTO.class);

//        Converter<BigDecimal, String> converter = context -> {
//            BigDecimal bd = context.getSource();
//            return df.format(bd);
//        };

//        error if using converter to convert Instant to LocalDateTime
//        Converter<Instant, LocalDateTime> converterDate =
//                context -> LocalDateTime.ofInstant((Instant) context.getSource(), ZoneId.systemDefault());

        propertyMapper.addMappings(mapper -> {
//            mapper.using(converter)
//                    .map(Service::getPrice, ServiceDTO::setPrice);
//            mapper.using(converterDate)
//                    .map(Service::getCreatedDate, ServiceDTO::setCreatedDate);
//            mapper.using(converterDate)
//                    .map(Service::getUpdatedDate, ServiceDTO::setUpdatedDate);
        });
        return mapper.map(service, ServiceDTO.class);
    }
    public List<ServiceDTO> toServiceDTOs(List<Service> services) {
        return services.stream()
                .map(this::toServiceDTO)
                .collect(Collectors.toList());
    }
}
