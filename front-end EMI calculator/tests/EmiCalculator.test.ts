import {assert} from 'chai';

/**
 * fetchAPI Function
 *
 * A utility function for making API requests with default values.
 *
 * @function
 * @param {object} options - Options for the API request.
 * @param {string} options.emiOption - The EMI option (default: 'car').
 * @param {string} options.email - The email address (default: 'test@example.com').
 * @param {number} options.loanValue - The loan value (default: 100000).
 * @param {number} options.yearlyInterestRate - The yearly interest rate (default: 5).
 * @param {number} options.yearlyLoanTerm - The yearly loan term (default: 20).
 * @param {string} url - The API endpoint URL (default: 'http://192.168.178.11:8080/emi/calculate').
 * @param {'POST' | 'GET'} method - The HTTP request method (default: 'POST').
 * @returns {Promise<object>} - A promise that resolves to the JSON response from the API.
 */
async function fetchAPI(
    {
        emiOption = 'car',
        email = 'test@example.com',
        loanValue = 100000,
        yearlyInterestRate = 5,
        yearlyLoanTerm = 20
    } = {},
    url: string = 'http://192.168.178.11:8080/emi/calculate', method: 'POST' | 'GET' = 'POST') {
    const mockEmiRequest = {
        emiOption: emiOption,
        email: email,
        loanValue: loanValue,
        yearlyInterestRate: yearlyInterestRate,
        yearlyLoanTerm: yearlyLoanTerm
    };

    const fetchOptions: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    }

    if (method === 'POST') {
        fetchOptions.body = JSON.stringify(mockEmiRequest);
    }

    const response = await fetch(url, fetchOptions);
    return response.json();
}

before ("test", async ()  => {
    await fetchAPI({
         emiOption: "home",
         email: "rabo@home.nl",
         loanValue: 60000,
         yearlyInterestRate: 4,
         yearlyLoanTerm: 10,
    });
    await fetchAPI({
         emiOption: "personal",
         email: "test@example.com",
         loanValue: 120000,
         yearlyInterestRate: 6,
         yearlyLoanTerm: 12,
    });
});

describe('EMI Calculation API Tests', () => {
    it('should successfully calculate EMI', async () => {
        const mockEmiResponse = {
            emi: 659.9557392166588,
            message: "EMI calculated and saved successfully"
        };

        try {
            let result = await fetchAPI();

            assert.equal(result.emi, mockEmiResponse.emi, 'This should contain the correct emi ' + mockEmiResponse.emi)
            assert.equal(result.message, mockEmiResponse.message, 'This should contain the correct response message ' + mockEmiResponse.message)
        } catch (error) {
            assert.fail("Error occurred fetching API response")
        }
    });
});


describe('EMI Calculation API Tests with incorrect data values', () => {
    it('should send an incorrect request because of the yearlyInterestRate', async () => {
        const mockEmiResponse = {
            message: 'Validation Failed',
            details: ['yearlyInterestRate: Interest rate should be between 0 and 100.']

        };

        try {
            let result = await fetchAPI({yearlyInterestRate: 101});

            assert.equal(result.message, mockEmiResponse.message, 'This should contain the correct invalid response message ' + mockEmiResponse.message)
            assert.equal(result.details[0], mockEmiResponse.details[0], 'This should contain the correct response message: ' + mockEmiResponse.details[0])

            result = await fetchAPI({yearlyInterestRate: -1});

            assert.equal(result.message, mockEmiResponse.message, 'This should contain the correct invalid response message ' + mockEmiResponse.message)
            assert.equal(result.details[0], mockEmiResponse.details[0], 'This should contain the correct response message: ' + mockEmiResponse.details[0])
        } catch (error) {
            assert.fail("Error occurred fetching API response")
        }
    });
});

    it('should send an incorrect request because of the loanValue', async () => {
        const mockEmiResponse = {
            message: 'Validation Failed',
            details: ['loanValue: Loan value must be a positive number.']

        };

        try {
            let result = await fetchAPI({loanValue: -1});

            assert.equal(result.message, mockEmiResponse.message, 'This should contain the correct invalid response message ' + mockEmiResponse.message)
            assert.equal(result.details[0], mockEmiResponse.details[0], 'This should contain the correct response message: ' + mockEmiResponse.details[0])
        } catch (error) {
            assert.fail("Error occurred fetching API response")
        }
    });

    it('should send an incorrect request because of the yearlyLoanTerm', async () => {
        const mockEmiResponse = {
            message: 'Validation Failed',
            details: ['yearlyLoanTerm: Loan term should be between 0 and 30 years.']

        };

        try {
            let result = await fetchAPI({yearlyLoanTerm: 31});

            assert.equal(result.message, mockEmiResponse.message, 'This should contain the correct invalid response message ' + mockEmiResponse.message)
            assert.equal(result.details[0], mockEmiResponse.details[0], 'This should contain the correct response message: ' + mockEmiResponse.details[0])

            result = await fetchAPI({yearlyLoanTerm: -1});

            assert.equal(result.message, mockEmiResponse.message, 'This should contain the correct invalid response message ' + mockEmiResponse.message)
            assert.equal(result.details[0], mockEmiResponse.details[0], 'This should contain the correct response message: ' + mockEmiResponse.details[0])
        } catch (error) {
            assert.fail("Error occurred fetching API response")
        }
    });

    it('should send an incorrect request with multiple fields being incorrect', async () => {
        const mockEmiResponse = {
            message: 'Validation Failed',
            details: [
                'loanValue: Loan value must be a positive number.',
                'yearlyInterestRate: Interest rate should be between 0 and 100.',
                'yearlyLoanTerm: Loan term should be between 0 and 30 years.'
            ]
        };

        try {
            const result = await fetchAPI({yearlyInterestRate: -1, loanValue: -1, yearlyLoanTerm: 31});
            result.details.sort();

            assert.equal(result.message, mockEmiResponse.message, 'This should contain the correct invalid reponse message ' + mockEmiResponse.message)
            assert.equal(result.details[0], mockEmiResponse.details[0], 'This should contain the correct response message: ' + mockEmiResponse.details[0])
            assert.equal(result.details[1], mockEmiResponse.details[1], 'This should contain the correct response message: ' + mockEmiResponse.details[1])
            assert.equal(result.details[2], mockEmiResponse.details[2], 'This should contain the correct response message: ' + mockEmiResponse.details[2])
        } catch (error) {
            assert.fail("Error occurred fetching API response")
        }
    });

describe('EMI Calculation API Test Getters', () => {
    it('should successfully fetch the correct EMI by ID', async () => {
        try {
            let result = await fetchAPI({}, "http://192.168.178.11:8080/emi/id/3", "GET");
            assert.equal(result.id, 3, 'This should be id 3')
        } catch (error) {
            assert.fail("Error occurred fetching API response")
        }
    });

    it('should successfully fetch the correct EMIs by email', async () => {
        try {
            let result = await fetchAPI({}, "http://192.168.178.11:8080/emi/email/test@example.com", "GET");
            assert.isAbove(result.length, 1, 'This should be more than 1');
            // This assertion is true because 2 EMI's are calculated before this test.
        } catch (error) {
            assert.fail("Error occurred fetching API response")
        }
    });
});
