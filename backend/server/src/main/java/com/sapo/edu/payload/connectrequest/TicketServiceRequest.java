package com.sapo.edu.payload.connectrequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketServiceRequest {
    @NotNull
    private Long serviceId;
}
