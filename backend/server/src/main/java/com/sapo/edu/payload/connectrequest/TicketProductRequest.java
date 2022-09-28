package com.sapo.edu.payload.connectrequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketProductRequest {
    @NotNull
    private Long productId;

    @NotNull
    @Size(min = 1)
    private Integer quantity;
}
