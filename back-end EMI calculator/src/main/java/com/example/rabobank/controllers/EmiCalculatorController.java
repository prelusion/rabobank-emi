package com.example.rabobank.controllers;

import com.example.rabobank.entities.EmiEntity;
import com.example.rabobank.models.EmiRequest;
import com.example.rabobank.models.EmiResponse;
import com.example.rabobank.services.EmiCalculatorService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller class for handling EMI calculations and related operations.
 */
@RestController
@CrossOrigin(origins = {"http://192.168.178.11:3000", "http://localhost:3000"})
@RequestMapping("/emi")
public class EmiCalculatorController {

    private final EmiCalculatorService emiCalculatorService;

    /**
     * Constructor for EmiCalculatorController.
     *
     * @param emiCalculatorService The service responsible for EMI calculations.
     */
    public EmiCalculatorController(EmiCalculatorService emiCalculatorService) {
        this.emiCalculatorService = emiCalculatorService;
    }

    /**
     * Calculate and save EMI based on the provided request.
     *
     * @param emiRequest The request containing EMI calculation parameters.
     * @return EmiResponse with EMI details.
     */
    @PostMapping("/calculate")
    public EmiResponse calculateEmi(@Valid @RequestBody EmiRequest emiRequest) {
        EmiEntity emiEntity = emiCalculatorService.calculateAndSaveEmi(emiRequest);
        return new EmiResponse(emiEntity.getId(), emiEntity.getEmi(), "EMI calculated and saved successfully");
    }

    /**
     * Retrieve EMI details by ID.
     *
     * @param id The ID of the EMI to retrieve.
     * @return EmiResponse with EMI details.
     * @throws EntityNotFoundException if EMI is not found for the provided ID.
     */
    @GetMapping("/id/{id}")
    public EmiResponse getEmi(@PathVariable Long id) {
        EmiEntity emiEntity = emiCalculatorService.findById(id);
        if (emiEntity == null) {
            throw new EntityNotFoundException("EMI not found for ID: " + id);
        }
        return new EmiResponse(emiEntity.getId(), emiEntity.getEmi(), "EMI fetched successfully");
    }

    /**
     * Retrieve EMI details by email.
     *
     * @param email The email associated with the EMI(s) to retrieve.
     * @return List of EmiResponse objects with EMI details.
     * @throws EntityNotFoundException if no EMI is found for the provided email.
     */
    @GetMapping("/email/{email}")
    public List<EmiResponse> getEmisByEmail(@PathVariable String email) {
        List<EmiEntity> emiEntities = emiCalculatorService.findByEmail(email);

        if (emiEntities.isEmpty()) {
            throw new EntityNotFoundException("EMI not found for email: " + email);
        }

        return emiEntities.stream()
                .map(entity -> new EmiResponse(entity.getId(), entity.getEmi(), "EMI fetched successfully"))
                .collect(Collectors.toList());
    }
}

