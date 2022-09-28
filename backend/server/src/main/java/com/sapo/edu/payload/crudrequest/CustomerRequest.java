package com.sapo.edu.payload.crudrequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequest {
    @NotBlank
    @Size(max = 50)
    private String name;

    @NotBlank
    @Size(max = 25)
    private String phone;

    @Size(max = 100)
    private String address;

}
