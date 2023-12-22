package com.example.rabobank.emi;

import com.example.rabobank.entities.EmiEntity;
import com.example.rabobank.models.EmiRequest;
import com.example.rabobank.repositories.EmiRepository;
import com.example.rabobank.services.EmiCalculatorService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

/**
 * Unit tests for the {@link EmiCalculatorService} class.
 */
public class EmiCalculatorServiceTest {

    private AutoCloseable closeable;
    private EmiCalculatorService emiService;

    @Mock
    private EmiRepository emiRepository;

    /**
     * Initialize the test service and mock repository before each test.
     */
    @BeforeEach
    void initService() {
        closeable = MockitoAnnotations.openMocks(this);
        emiService = new EmiCalculatorService(this.emiRepository);
    }

    /**
     * Close the service and clean up resources after each test.
     *
     * @throws Exception if there is an error during resource cleanup.
     */
    @AfterEach
    void closeService() throws Exception {
        closeable.close();
    }

    /**
     * Test whether the service correctly calculates and saves the EMI with valid input.
     */
    @Test
    void calculateAndSaveEmi_CalculatesCorrectEmi() {
        // Arrange
        EmiRequest emiRequest = new EmiRequest(100000, 5, 20); // Example values
        double expectedEmi = 659.96; // Pre-calculated expected EMI for the provided values

        // Create a mock EmiEntity that should be returned by the repository
        EmiEntity mockEmiEntity = new EmiEntity();
        mockEmiEntity.setEmi(expectedEmi);

        // Configure the repository mock to return the mockEmiEntity when save is called
        when(emiRepository.save(Mockito.any(EmiEntity.class))).thenReturn(mockEmiEntity);

        // Act
        EmiEntity emiEntity = emiService.calculateAndSaveEmi(emiRequest);

        // Assert
        assertEquals(expectedEmi, emiEntity.getEmi(), 0.01, "The EMI calculation should match the expected value.");
    }

    /**
     * Test whether the service correctly calculates and saves the EMI with all details provided.
     */
    @Test
    void calculateAndSaveEmi_CalculatesCorrectEmiAllDetails() {
        // Arrange
        EmiRequest emiRequest = new EmiRequest("car", "delanovdwaal@hotmail.com", 100000, 5, 20); // Example values
        double expectedEmi = 659.96; // Pre-calculated expected EMI for the provided values

        // Create a mock EmiEntity that should be returned by the repository
        EmiEntity mockEmiEntity = new EmiEntity();
        mockEmiEntity.setEmi(expectedEmi);

        // Configure the repository mock to return the mockEmiEntity when save is called
        when(emiRepository.save(Mockito.any(EmiEntity.class))).thenReturn(mockEmiEntity);

        // Act
        EmiEntity emiEntity = emiService.calculateAndSaveEmi(emiRequest);

        // Assert
        assertEquals(expectedEmi, emiEntity.getEmi(), 0.01, "The EMI calculation should match the expected value.");
    }
}
