package com.example.rabobank.exceptions;
import java.util.List;

/**
 * A simple record representing an API error with a message and a list of details.
 */
public record ApiError(String message, List<String> details) {}