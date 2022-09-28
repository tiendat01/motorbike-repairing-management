package com.sapo.edu.mapper.request;

import com.sapo.edu.entity.Product;
import com.sapo.edu.entity.connectentity.TicketProduct;
import com.sapo.edu.exception.EntityNotFoundException;
import com.sapo.edu.payload.connectrequest.TicketProductRequest;
import com.sapo.edu.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TicketProductRequestMapper {
    @Autowired
    private ProductRepository productRepository;
    public TicketProduct toTicketProduct(TicketProductRequest request) {
        TicketProduct ticketProduct = new TicketProduct();
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new EntityNotFoundException(Product.class, "productId", request.getProductId().toString()));

        ticketProduct.setProduct(product);
        ticketProduct.setQuantity(request.getQuantity());
        ticketProduct.setPrice(product.getPrice());
        // incomplete TicketProduct: setId(TicketProductId) and setTicket (because don't have new Ticket yet)

        return ticketProduct;
    }
}
