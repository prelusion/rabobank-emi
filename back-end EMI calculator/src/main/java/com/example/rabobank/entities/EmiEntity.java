package com.example.rabobank.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class EmiEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private double emi;
    private String email;
    private String emiOption;

    public EmiEntity() {
    }

    /**
     * Constructor for EmiEntity with EMI amount.
     *
     * @param emi The EMI amount.
     */
    public EmiEntity(double emi) {
        this.emi = emi;
    }


    /**
     * Constructor for EmiEntity with EMI amount, email, and option.
     *
     * @param emi      The EMI amount.
     * @param email    The email associated with the EMI.
     * @param emiOption The EMI option.
     */
    public EmiEntity(double emi, String email, String emiOption) {
        this.emi = emi;
        this.email = email;
        this.emiOption = emiOption;
    }

    // Getters and setters
    public long getId() {
        return id;
    }
    public double getEmi() {
        return emi;
    }
    public void setEmi(double emi) {
        this.emi = emi;
    }
    public void setOption(String emiOption) {
        this.emiOption = emiOption;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}