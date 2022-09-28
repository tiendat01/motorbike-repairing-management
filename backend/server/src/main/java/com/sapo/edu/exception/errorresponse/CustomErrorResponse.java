package com.sapo.edu.exception.errorresponse;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.validator.internal.engine.path.PathImpl;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import javax.validation.ConstraintViolation;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * error response:
 *
 * {
 *   "error": {
 * 	    "message": "entity not found",
 *  	"debugMessage": "ex.getMessage()"
 * 	    "timestamp": "",
 * 	    "status": "NOT_FOUND"
 *  	"code": 404
 * 	    "subErrors": [
 * 		    "object": "Product",
 * 		    "field": "id",
 * 		    "message": "entity not found"
 * 	    ]
 *   }
 * }
 */
@Data
@AllArgsConstructor
public class CustomErrorResponse {
    private HttpStatus status;
    private Integer code;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime timestamp;

    private String message;
    private String debugMessage;

    private List<SubError> subErrors;

    public CustomErrorResponse() {
        timestamp = LocalDateTime.now();
    }

    public CustomErrorResponse(HttpStatus status) {
        this();
        this.status = status;
        this.code = status.value();
    }

    public CustomErrorResponse(HttpStatus status, Throwable ex) {
        this();
        this.status = status;
        this.code = status.value();
        this.message = "Lỗi không mong muốn! Liên hệ bộ phận Dev để được fix! Cảm ơn bạn đã dò lỗi giùm!"; // "Unexpected error"
        this.debugMessage = ex.getLocalizedMessage();
    }

    public CustomErrorResponse(HttpStatus status, String message, Throwable ex) {
        this();
        this.status = status;
        this.code = status.value();
        this.message = message;
        this.debugMessage = ex.getLocalizedMessage();
    }


    public void addSubError(SubError subError) {
        if (this.subErrors == null) {
            this.subErrors = new ArrayList<>();
        }
        this.subErrors.add(subError);
    }



    public void addValidationError(String object, String field, String message) {
        addSubError(new ValidationError(object, field, message));

    }
    public void addValidationError(String object, String message) {
        addSubError(new ValidationError(object, message));
    }




    public void addValidationError(FieldError fieldError) {
        this.addValidationError(
                fieldError.getObjectName(),
                fieldError.getField(),
                fieldError.getDefaultMessage());
    }
    public void addValidationErrors(List<FieldError> fieldErrors) {
        fieldErrors.forEach(this::addValidationError);
    }

    private void addValidationError(ObjectError objectError) {
        this.addValidationError(
                objectError.getObjectName(),
                objectError.getDefaultMessage());
    }

    public void addValidationError(List<ObjectError> globalErrors) {
        globalErrors.forEach(this::addValidationError);
    }




    /**
     * Utility method for adding error of ConstraintViolation. Usually when a @Validated validation fails.
     *
     * @param cv the ConstraintViolation
     */
    private void addValidationError(ConstraintViolation<?> cv) {
        this.addValidationError(
                cv.getRootBeanClass().getSimpleName(),
                ((PathImpl) cv.getPropertyPath()).getLeafNode().asString(),
                cv.getMessage());
    }

    public void addValidationErrors(Set<ConstraintViolation<?>> constraintViolations) {
        constraintViolations.forEach(this::addValidationError);
    }

}
