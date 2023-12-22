package com.example.rabobank.repositories;

import com.example.rabobank.entities.EmiEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for accessing and managing EMI (Equated Monthly Installment) data in the database.
 */
@Repository
public interface EmiRepository extends JpaRepository<EmiEntity, Long> { /**

     * Find a list of EMI entities by email.
     *
     * @param email The email associated with the EMI entities to retrieve.
     * @return A list of EMI entities matching the provided email.
     */
    List<EmiEntity> findByEmail(String email);
}