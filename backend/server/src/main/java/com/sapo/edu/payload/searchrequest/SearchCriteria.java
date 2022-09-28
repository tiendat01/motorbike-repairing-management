package com.sapo.edu.payload.searchrequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchCriteria {
    private String key; // field name of entity
    private String operation;
    private Object value;
}
