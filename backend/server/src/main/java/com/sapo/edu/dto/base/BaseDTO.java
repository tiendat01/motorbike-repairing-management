package com.sapo.edu.dto.base;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.ALWAYS)
//@JsonInclude(value = JsonInclude.Include.NON_NULL)
//@JsonIgnoreProperties(ignoreUnknown = true)
public abstract class BaseDTO {
    protected Long id;
//    protected String createdBy;
//    protected Timestamp createdDate;
//    protected String modifiedBy;
//    protected Timestamp modifiedDate;
}
