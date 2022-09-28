package com.sapo.edu.payload.crudrequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {
    @NotBlank
    @Size(max = 50)
    private String name;

    @Size(max = 1024)
    private String description;
}
