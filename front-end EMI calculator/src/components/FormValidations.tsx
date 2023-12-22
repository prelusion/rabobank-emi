import { RegisterOptions } from 'react-hook-form';

/**
 * emailValidation
 *
 * Validation options for email input.
 */
export const emailValidation: RegisterOptions = {
    required: "Please enter an email.",
    pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address."
    }
};

/**
 * loanValueValidation
 *
 * Validation options for loan value input.
 */
export const loanValueValidation: RegisterOptions = {
    required: "Please enter a loan value.",
    min: {
        value: 0,
        message: "Loan value must at least be a positive number"
    },
};

/**
 * interestRateValidation
 *
 * Validation options for yearly interest rate input.
 *
 * @constant
 * @type {RegisterOptions}
 */
export const interestRateValidation: RegisterOptions = {
    required: "Please enter a yearly interest rate.",
    min: {
        value: 0,
        message: "Interest rate must be at least 0."
    },
    max: {
        value: 100,
        message: "Interest rate must not exceed 100."
    }
};