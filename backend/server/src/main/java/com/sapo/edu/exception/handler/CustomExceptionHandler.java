package com.sapo.edu.exception.handler;

import com.sapo.edu.exception.BusinessLogicException;
import com.sapo.edu.exception.CustomValidationException;
import com.sapo.edu.exception.DuplicateEntityException;
import com.sapo.edu.exception.EntityNotFoundException;
import com.sapo.edu.exception.errorresponse.CustomErrorResponse;
import com.sapo.edu.exception.errorresponse.SubError;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.NoSuchElementException;

// có thể s/d @RestControllerAdvice bao gồm @ControllerAdvice và @ResponseBody
@ControllerAdvice
@ResponseBody
@Slf4j
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {
    /**
     * Handle MethodArgumentNotValidException. Triggered when an object fails @Valid validation.
     *
     * @param ex      the MethodArgumentNotValidException that is thrown when @Valid validation fails
     * @param headers HttpHeaders
     * @param status  HttpStatus
     * @param request WebRequest
     * @return the CustomErrorResponse object
     */
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.BAD_REQUEST, ex);
        errorResponse.setMessage("Validation error");
        errorResponse.addValidationErrors(ex.getBindingResult().getFieldErrors());
        errorResponse.addValidationError(ex.getBindingResult().getGlobalErrors());
        return buildResponseEntity(errorResponse);
    }

    /**
     * Handle javax.persistence.EntityNotFoundException
     */
    @ExceptionHandler(javax.persistence.EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    protected ResponseEntity<Object> handleEntityNotFound(javax.persistence.EntityNotFoundException ex) {
        return buildResponseEntity(new CustomErrorResponse(HttpStatus.NOT_FOUND, ex));
    }

    /**
     * Handle java.util.NoSuchElementException
     */
    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    protected ResponseEntity<Object> handleNoSuchElement(javax.persistence.NoResultException ex) {
        return buildResponseEntity(new CustomErrorResponse(HttpStatus.NOT_FOUND, ex));
    }


    /**
     * Handles EntityNotFoundException. Created to encapsulate errors with more detail than javax.persistence.EntityNotFoundException.
     *
     * @param ex the EntityNotFoundException
     * @return the CustomErrorResponse object
     */
    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    protected ResponseEntity<Object> handleEntityNotFound(
            EntityNotFoundException ex) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.NOT_FOUND, ex);
        errorResponse.setMessage(ex.getMessage());
        errorResponse.setDebugMessage(StringUtils.joinWith("\n", ex.getStackTrace()));
        errorResponse.addSubError(new SubError(ex.getObject(), "", ex.getMessage()) {
            // create new instance of anonymous class extends SubError parent class
        });
        return buildResponseEntity(errorResponse);
    }


    /**
     *
     * @param ex
     * @return
     */
    @ExceptionHandler(DuplicateEntityException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    protected ResponseEntity<Object> handleDuplicateEntity(DuplicateEntityException ex) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.CONFLICT, ex);
        errorResponse.setMessage(ex.getMessage());
        errorResponse.setDebugMessage(StringUtils.joinWith("\n", ex.getStackTrace()));
        errorResponse.addSubError(new SubError(ex.getObject(), ex.getFieldName(), ex.getMessage()) {
            // create new instance of anonymous class extends SubError parent class
            @Override
            public String toString() {
                return super.toString();
            }
        });

        return buildResponseEntity(errorResponse);
    }







    /**
     * Handle MissingServletRequestParameterException. Triggered when a 'required' request parameter is missing.
     *
     * @param ex      MissingServletRequestParameterException
     * @param headers HttpHeaders
     * @param status  HttpStatus
     * @param request WebRequest
     * @return the CustomErrorResponse object
     */
    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(
            MissingServletRequestParameterException ex, HttpHeaders headers,
            HttpStatus status, WebRequest request) {
        String error = ex.getParameterName() + " parameter is missing";
        return buildResponseEntity(new CustomErrorResponse(HttpStatus.BAD_REQUEST, error, ex));
    }


    /**
     * Handle HttpMediaTypeNotSupportedException. This one triggers when JSON is invalid as well.
     *
     * @param ex      HttpMediaTypeNotSupportedException
     * @param headers HttpHeaders
     * @param status  HttpStatus
     * @param request WebRequest
     * @return the CustomErrorResponse object
     */
    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(
            HttpMediaTypeNotSupportedException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        StringBuilder builder = new StringBuilder();
        builder.append(ex.getContentType());
        builder.append(" media type is not supported. Supported media types are ");
        ex.getSupportedMediaTypes().forEach(t -> builder.append(t).append(", "));
        return buildResponseEntity(new CustomErrorResponse(HttpStatus.UNSUPPORTED_MEDIA_TYPE, builder.substring(0, builder.length() - 2), ex));
    }




    /**
     * Handles javax.validation.ConstraintViolationException. Thrown when @Validated fails.
     * Exception thrown when an action would violate a constraint on repository structure
     *
     * @param ex the ConstraintViolationException
     * @return the CustomErrorResponse object
     */
    @ExceptionHandler(javax.validation.ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected ResponseEntity<Object> handleConstraintViolation(
            javax.validation.ConstraintViolationException ex) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.BAD_REQUEST, ex);
        errorResponse.setMessage("Validation error");
        errorResponse.addValidationErrors(ex.getConstraintViolations());
        return buildResponseEntity(errorResponse);
    }


    /**
     * Handle HttpMessageNotReadableException. Happens when request JSON is malformed.
     *
     * @param ex      HttpMessageNotReadableException
     * @param headers HttpHeaders
     * @param status  HttpStatus
     * @param request WebRequest
     * @return the CustomErrorResponse object
     */
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        ServletWebRequest servletWebRequest = (ServletWebRequest) request;
        log.info("{} to {}", servletWebRequest.getHttpMethod(), servletWebRequest.getRequest().getServletPath());
        String error = "Malformed JSON request";
        return buildResponseEntity(new CustomErrorResponse(HttpStatus.BAD_REQUEST, error, ex));
    }

    /**
     * Handle HttpMessageNotWritableException.
     *
     * @param ex      HttpMessageNotWritableException
     * @param headers HttpHeaders
     * @param status  HttpStatus
     * @param request WebRequest
     * @return the CustomErrorResponse object
     */
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotWritable(HttpMessageNotWritableException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        String error = "Error writing JSON output";
        return buildResponseEntity(new CustomErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error, ex));
    }

    /**
     * Handle NoHandlerFoundException.
     *
     * @param ex
     * @param headers
     * @param status
     * @param request
     * @return
     */
    @Override
    protected ResponseEntity<Object> handleNoHandlerFoundException(
            NoHandlerFoundException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.BAD_REQUEST, ex);
        errorResponse.setMessage(String.format("Could not find the %s method for URL %s", ex.getHttpMethod(), ex.getRequestURL()));
        errorResponse.setDebugMessage(ex.getMessage());
        return buildResponseEntity(errorResponse);
    }


    /**
     * Handle DataIntegrityViolationException, inspects the cause for different DB causes.
     *
     * @param ex the DataIntegrityViolationException
     * @return the CustomErrorResponse object
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    protected ResponseEntity<Object> handleDataIntegrityViolation(DataIntegrityViolationException ex,
                                                                  WebRequest request) {
        // exception in constraint in database: e.g unique constraint
        if (ex.getCause() instanceof ConstraintViolationException) {
            return buildResponseEntity(new CustomErrorResponse(HttpStatus.CONFLICT, "Database error", ex.getCause()));
        }
        return buildResponseEntity(new CustomErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex));
    }

    /**
     * Handle Exception, handle generic Exception.class
     *
     * @param ex the Exception
     * @return the CustomErrorResponse object
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected ResponseEntity<Object> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex,
                                                                      WebRequest request) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.BAD_REQUEST, ex);
        errorResponse.setMessage(String.format("The parameter '%s' of value '%s' could not be converted to type '%s'", ex.getName(), ex.getValue(), ex.getRequiredType().getSimpleName()));
        errorResponse.setDebugMessage(ex.getMessage());
        return buildResponseEntity(errorResponse);
    }


    /**
     * BadCredentialsException: Thrown if an authentication request is rejected because the credentials are invalid.
     * For this exception to be thrown, it means the account is neither locked nor disabled.
     *
     * @param ex
     * @return
     */
    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<Object> handleUnauthorized(BadCredentialsException ex) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.UNAUTHORIZED, ex);
        errorResponse.setMessage(ex.getMessage() + ": Username or Password incorrect");
        errorResponse.setDebugMessage(StringUtils.joinWith("\n", ex.getStackTrace()));
        return buildResponseEntity(errorResponse);
    }


    // unauthorized request
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ResponseEntity<Object> handleAccessDenied(AccessDeniedException ex) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.UNAUTHORIZED, ex);
        errorResponse.setMessage(ex.getMessage() + ": You are not unauthorized to request http resource");
        errorResponse.setDebugMessage(StringUtils.joinWith("\n", ex.getStackTrace()));
        return buildResponseEntity(errorResponse);
    }



    @ExceptionHandler(CustomValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Object> handleCustomValidation(CustomValidationException ex) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.BAD_REQUEST, ex);
        errorResponse.setMessage(ex.getMessage());
        errorResponse.setDebugMessage(StringUtils.joinWith("\n", ex.getStackTrace()));
        return buildResponseEntity(errorResponse);
    }




    @ExceptionHandler(BusinessLogicException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Object> handleBusinessLogicError(BusinessLogicException ex) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.BAD_REQUEST, ex);
        errorResponse.setMessage("Lỗi logic nghiệp vụ (BusinessLogicException): " + ex.getMessage());
        errorResponse.setDebugMessage(ex.getStackTrace().toString());
        return buildResponseEntity(errorResponse);
    }



    /**
     * Handle all uncaught exception
     * @param ex
     * @return
     */
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<Object> handleAllUncaughtException(RuntimeException ex) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex);
        errorResponse.setMessage(ex.getLocalizedMessage());
        errorResponse.setDebugMessage(StringUtils.joinWith("\n", ex.getStackTrace()));
        return buildResponseEntity(errorResponse);
    }





    /**
     * @param customErrorResponse
     * @return
     */
    private ResponseEntity<Object> buildResponseEntity(CustomErrorResponse customErrorResponse) {
        return new ResponseEntity<>(customErrorResponse, customErrorResponse.getStatus());
    }
}
