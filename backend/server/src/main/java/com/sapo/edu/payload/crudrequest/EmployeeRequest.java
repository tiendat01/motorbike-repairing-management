package com.sapo.edu.payload.crudrequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeRequest {
    // For role that need to log in
    @Size(min = 4, max = 40)
    private String username;

    @Size(min = 4, max = 40)
    private String password;

    private Set<String> roles; // roles and permission can be updated (updating this feature ...)

    // For all employees
    @NotBlank
    @Size(max = 50)
    private String name;

    @Size(max = 25)
    private String phone;

    @Size(max = 100)
    private String address;

    private Boolean workingStatus;

}
