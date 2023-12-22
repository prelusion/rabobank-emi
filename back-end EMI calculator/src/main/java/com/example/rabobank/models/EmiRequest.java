package com.example.rabobank.models;

import jakarta.validation.constraints.Positive;
import org.hibernate.validator.constraints.Range;

/**
 * A data class representing a request for EMI (Equated Monthly Installment) calculation.
 */
public class EmiRequest {
    private String emiOption;
    private String email;
  /**
     * The loan amount requested for EMI calculation.
     */
    @Positive(message = "Loan value must be a positive number.")
    private double loanValue;

    /**
     * The yearly interest rate for EMI calculation.
     */
    @Range(min = 0, max = 100, message = "Interest rate should be between 0 and 100.")
    private double yearlyInterestRate;

    /**
     * The yearly loan term (in years) for EMI calculation.
     */
    @Range(min = 0, max = 30, message = "Loan term should be between 0 and 30 years.")
    private int yearlyLoanTerm;

    /**
     * Default constructor for EmiRequest.
     */
    public EmiRequest() {  }

    /**
     * Constructor for EmiRequest with loan details.
     *
     * @param loanValue          The loan amount requested for EMI calculation.
     * @param yearlyInterestRate The yearly interest rate for EMI calculation.
     * @param yearlyLoanTerm     The yearly loan term (in years) for EMI calculation.
     */
    public EmiRequest(double loanValue, double yearlyInterestRate, int yearlyLoanTerm) {
        this.loanValue = loanValue;
        this.yearlyInterestRate = yearlyInterestRate;
        this.yearlyLoanTerm = yearlyLoanTerm;
    }

    /**
     * Constructor for EmiRequest with loan and user details.
     *
     * @param emiOption          The EMI option.
     * @param email              The email of the user requesting EMI calculation.
     * @param loanValue          The loan amount requested for EMI calculation.
     * @param yearlyInterestRate The yearly interest rate for EMI calculation.
     * @param yearlyLoanTerm     The yearly loan term (in years) for EMI calculation.
     */
    public EmiRequest(String emiOption, String email, double loanValue, double yearlyInterestRate, int yearlyLoanTerm) {
        this.emiOption = emiOption;
        this.email = email;
        this.loanValue = loanValue;
        this.yearlyInterestRate = yearlyInterestRate;
        this.yearlyLoanTerm = yearlyLoanTerm;
    }

    // Getters and setters
    public double getLoanValue() {
        return loanValue;
    }
    public double getYearlyInterestRate() {
        return yearlyInterestRate;
    }
    public int getYearlyLoanTerm() {
        return yearlyLoanTerm;
    }
    public String getEmail() {
        return email;
    }
    public String getEmiOption() {
        return emiOption;
    }
}
