package com.sapo.edu.mapper.dto;

import com.sapo.edu.dto.EmployeeDTO;
import com.sapo.edu.dto.ProductDTO;
import com.sapo.edu.dto.ServiceDTO;
import com.sapo.edu.entity.Category;
import com.sapo.edu.entity.Employee;
import com.sapo.edu.entity.Product;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Component
public class ProductDTOMapper {
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private ModelDTOMapper modelDTOMapper;
    @Autowired
    private CategoryDTOMapper categoryDTOMapper;

    public ProductDTO toProductDTO(Product product) {
        // using hand

//        ProductDTO productDTO = new ProductDTO();
//        productDTO.setCode(product.getCode());
//        productDTO.setName(product.getName());
//        productDTO.setDescription(product.getDescription());
//        productDTO.setCategoryName(product.getCategory().getName());
//        productDTO.setPrice(product.getPrice());
//        productDTO.setQuantity(product.getQuantity());
//        productDTO.setImage(product.getImage());
//        return productDTO;



        // using ModelMapper dependency

        TypeMap<Product, ProductDTO> propertyMapper = mapper.getTypeMap(Product.class, ProductDTO.class) == null ?
                mapper.createTypeMap(Product.class, ProductDTO.class)
                :
                mapper.getTypeMap(Product.class, ProductDTO.class);

//        DecimalFormat df = new DecimalFormat("#,###.00");
//        df.setDecimalFormatSymbols(new DecimalFormatSymbols(Locale.getDefault()));

//        propertyMapper
//                .addMappings(mapper -> mapper.map(src->src.getCategory().getName(), ProductDTO::setCategory))
//                .addMappings(mapper -> mapper.using(context -> df.format(((BigDecimal)context.getSource())))
//                        .map(Product::getPrice, ProductDTO::setPrice));

        // other way
        propertyMapper
                .addMappings(mapper -> {
                    mapper.map(src->src.getCategory().getName(), ProductDTO::setCategory);
                    mapper.using(context -> categoryDTOMapper.toCategoryDTO((Category) context.getSource()))
                            .map(Product::getCategory, ProductDTO::setCategory);
//                    mapper.using(context -> df.format(((BigDecimal)context.getSource()))) // using converter
//                            .map(Product::getPrice, ProductDTO::setPrice);
                });

        ProductDTO productDTO = mapper.map(product, ProductDTO.class);
        // map set by hand
        if (product.getModels() != null)
            productDTO.setModels(modelDTOMapper.toModelDTOs(product.getModels()));
        return mapper.map(product, ProductDTO.class);
    }

    public List<ProductDTO> toProductDTOs(List<Product> products) {
        return products
                .stream()
                .map(this::toProductDTO)
                .collect(Collectors.toList());
    }
}
