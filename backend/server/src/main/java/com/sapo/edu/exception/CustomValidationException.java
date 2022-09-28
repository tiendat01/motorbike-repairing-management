package com.sapo.edu.exception;

public class CustomValidationException extends RuntimeException {
    public CustomValidationException(String message) {
        super(message);
    }
}
