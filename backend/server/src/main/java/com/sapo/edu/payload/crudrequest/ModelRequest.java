package com.sapo.edu.payload.crudrequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModelRequest {
    @NotBlank
    @Size(max = 50, message = "Brand name cannot exceed 50 characters")
    private String brandName;

    @NotBlank
    @Size(max = 50, message = "Brand name cannot exceed 50 characters")
    private String modelName;
}
