package com.example.rabobank.models;

/**
 * A record representing the response for EMI (Equated Monthly Installment) calculations.
 */
public record EmiResponse(long id, double emi, String message) {
}