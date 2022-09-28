package com.sapo.edu.exception.errorresponse;

import lombok.Data;

@Data
public class ValidationError extends SubError {

    public ValidationError(String object, String field, String message) {
        super(object, field, message);
    }

    public ValidationError(String object, String message) {
        super();
        this.object = object;
        this.message = message;
    }
}
