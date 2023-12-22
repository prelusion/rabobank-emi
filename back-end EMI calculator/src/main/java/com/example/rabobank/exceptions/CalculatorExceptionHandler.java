package com.example.rabobank.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Global exception handler for the Calculator API, responsible for handling
 * validation errors using Spring's {@code MethodArgumentNotValidException}.
 */
@ControllerAdvice
public class CalculatorExceptionHandler {

   /**
     * Exception handler method for handling validation errors.
     *
     * @param ex The {@code MethodArgumentNotValidException} raised during validation.
     * @return An {@code ApiError} (Record) object containing error details.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ApiError handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<String> errorDetails = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage())
                .collect(Collectors.toList());

        return new ApiError("Validation Failed", errorDetails);
    }
}
