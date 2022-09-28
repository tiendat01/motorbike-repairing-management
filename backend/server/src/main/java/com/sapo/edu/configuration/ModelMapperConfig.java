package com.sapo.edu.configuration;

import org.hibernate.collection.spi.PersistentCollection;
import org.modelmapper.Condition;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        // create instance and config
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);

//        modelMapper.getConfiguration().setPropertyCondition(new Condition<Object, Object>() {
//            public boolean applies(MappingContext<Object, Object> context) {
//                return !(context.getSource() instanceof PersistentCollection);
//            }
//        });
        return modelMapper;
    }
}
