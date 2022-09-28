package com.sapo.edu.payload.crudrequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MotorbikeRequest {
    @NotBlank
    @Size(max = 20, message = "License Plates (biển số xe) cannot exceed 20 characters")
    private String licensePlates;
    @NotBlank
    @Size(max = 50, message = "Model name cannot exceed 50 characters")
    private String modelName;
    @NotBlank
    @Size(max = 50, message = "Brand name cannot exceed 50 characters")
    private String brandName;
}
