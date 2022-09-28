package com.sapo.edu.exception.errorresponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class SubError {
    protected String object; // object name
    protected String field; // field of object makes invalid
    protected String message; // detail message error

}
