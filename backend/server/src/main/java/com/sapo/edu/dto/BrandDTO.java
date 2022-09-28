package com.sapo.edu.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.sapo.edu.dto.base.BaseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.ALWAYS)
//@JsonInclude(value = JsonInclude.Include.NON_NULL) // skip property that null in returned json object
//@JsonIgnoreProperties(ignoreUnknown = true)
public class BrandDTO extends BaseDTO {
    private String brandName;
}
