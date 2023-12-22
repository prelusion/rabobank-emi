package com.example.rabobank.services;

import com.example.rabobank.entities.EmiEntity;
import com.example.rabobank.models.EmiRequest;
import com.example.rabobank.repositories.EmiRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class responsible for EMI (Equated Monthly Installment) calculations and data manipulation.
 */
@Service
public class EmiCalculatorService {

    private final EmiRepository emiRepository;

    /**
     * Constructor for EmiCalculatorService.
     *
     * @param emiRepository The repository for accessing EMI data.
     */
    public EmiCalculatorService(EmiRepository emiRepository) {
        this.emiRepository = emiRepository;
    }

    /**
     * Calculate and save EMI based on the provided request.
     *
     * @param request The request containing EMI calculation parameters.
     * @return An EMIEntity representing the calculated EMI details.
     */
    public EmiEntity calculateAndSaveEmi(EmiRequest request) {
        String email = request.getEmail();
        String emiOption = request.getEmiOption();
        double P = request.getLoanValue();
        double R = request.getYearlyInterestRate() / 100 / 12;  // Turns annual interest rate to a monthly decimal
        int N = request.getYearlyLoanTerm() * 12;               // Turns annual loanTerm into monthly tenure.

        double numerator = P * R * Math.pow((1 + R), N);
        double denominator = Math.pow((1 + R), N) - 1;
        double emi = numerator / denominator;

        EmiEntity emiEntity = new EmiEntity();
        emiEntity.setEmi(emi);
        emiEntity.setOption(emiOption);

        if (email != null && !email.isEmpty()) {
            emiEntity.setEmail(email);
        }

        return emiRepository.save(emiEntity);
    }

    /**
     * Find an EMIEntity by its unique identifier.
     *
     * @param id The ID of the EMIEntity to retrieve.
     * @return The EMIEntity with the specified ID, or null if not found.
     */
    public EmiEntity findById(Long id) {
        return emiRepository.findById(id).orElse(null);
    }

    /**
     * Find a list of EMIEntities by email.
     *
     * @param email The email associated with the EMIEntities to retrieve.
     * @return A list of EMIEntities matching the provided email.
     */
    public List<EmiEntity> findByEmail(String email) {
        return emiRepository.findByEmail(email); // Assuming this returns a List<EmiEntity>
    }
}