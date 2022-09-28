package com.sapo.edu.payload.crudrequest;

import com.sapo.edu.payload.connectrequest.TicketProductRequest;
import com.sapo.edu.payload.connectrequest.TicketServiceRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketRequest {
    @Size(max = 1024)
    private String description;

    @Size(max = 1024)
    private String note;

    @NotNull
    private Byte status = 0;

    private BigDecimal discount; // unit: vnd

    @NotNull
    private Long motorbikeId;

    private Long customerId;
    private Long repairingEmployeeId;

    @Size(max = 100)
    private String paymentMethod = "Thanh toán bằng tiền mặt";

    private LocalDateTime appointmentDate;

    private Set<TicketProductRequest> productRequestSet;
    private Set<TicketServiceRequest> serviceRequestSet;
}


//{
//        "description": "This ticket for test only",
//        "note": "Some additional information here",
//        "status": 0,
//        "appointmentDate": "2022-08-30T00:00:00",
//        "discount": 10,
//        "motorbikeId": 1,
//        "repairingEmployeeId": 1,
//        "customerId": 1,
//        "productRequestSet": [
//        {
//        "productId": 1,
//        "quantity": 10
//        },
//        {
//        "productId": 2,
//        "quantity": 10
//        }
//        ],
//        "serviceRequestSet": [
//        {
//        "serviceId": 2
//        }
//        ]
//        }