package com.sapo.edu.payload.crudrequest;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {

    @NotBlank
    @Size(max=100)
    private String name;

    @Size(max = 1024)
    private String description;

    @NotNull
    private Long categoryId; // must need category before

    @NotNull
    private BigDecimal price;

    private Integer quantity = 0;
    private String unit = "Đơn vị số lượng";

    @Size(max = 512)
    private String image;

    private Set<Long> modelIdSet;
}
