package com.sapo.edu.payload.crudrequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceRequest {
    @NotBlank
    @Size(max = 50)
    private String name;

    @Size(max = 1024)
    private String description;

    @NotNull
    private BigDecimal price;
}
