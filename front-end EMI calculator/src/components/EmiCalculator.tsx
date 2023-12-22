import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import EmiResults from "./EmiResults";
import OptionSelect from "./OptionSelect";
import InputField from "./InputField";
import {emailValidation, loanValueValidation, interestRateValidation} from './FormValidations';

/**
 * EmiCalculator Component
 *
 * This component provides a loan EMI calculator with options to choose the type of loan, loan details, and calculate the EMI.
 *
 * @component
 * @returns {JSX.Element} - The EmiCalculator component.
 */

type FormData = {
    emiOption: 'car' | 'home' | 'personal';
    email: string;
    loanValue: number;
    yearlyInterestRate: number;
    yearlyLoanTerm: number;
};

interface ValidationError {
    details: string[];
}

const EmiCalculator: React.FC = () => {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormData>();
    const [selectedOption, setSelectedOption] = useState('car');
    const [yearlyLoanTerm, setYearlyLoanTerm] = useState(1);
    const [result, setResult] = useState(null);
    const [validationError, setValidationError] = useState<ValidationError | null>();

    const handleTermChange = (event: any) => {
        setYearlyLoanTerm(parseInt(event.target.value, 10));
    };

    const handleOptionChange = (option: any) => {
        setSelectedOption(option);
        setValue("emiOption", option); // Update the form state
    };

    const onSubmit = async (data: FormData) => {

        try {
            const response = await fetch('http://localhost:8080/emi/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });


            if (!response.ok) {
                const error = await response.json()
                setValidationError(error);
                setResult(null);
            }

            const result = await response.json();
            result.data = data;
            setResult(result);
            setValidationError(null);
            // Handle the response as needed
        } catch (error) {
            console.error('There was an error submitting the form', error);
        }
    };

    const option: string = selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1);
    return (
        <div className="emi-wrapper p-5">
            {result && (
                <div className="text-black p-5">
                    <h2 className="text-orange-600 font-bold">
                        {option} Loan EMI Result.
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Monthly payment is:
                    </p>
                    <EmiResults result={result}/>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="p-5 text-black p-5">
                <h2 className="text-orange-600 font-bold">
                    {option} Loan EMI Calculator.
                </h2>

                <p className="text-gray-500 text-sm">
                    Choose a different calculator below
                </p>
                <div className="flex flex-row justify-between">
                    <OptionSelect
                        register={register}
                        selectedOption={selectedOption}
                        onOptionChange={handleOptionChange}
                    />
                </div>

                <InputField
                    label="Your email"
                    type="email"
                    name="email"
                    register={register}
                    validationRules={emailValidation}
                    error={errors.email}
                />

                <InputField
                    label="How much would you like to borrow?"
                    type="number"
                    name="loanValue"
                    register={register}
                    validationRules={loanValueValidation}
                    error={errors.loanValue}
                />

                <InputField
                    label="Yearly interest (%)"
                    type="text"
                    name="yearlyInterestRate"
                    register={register}
                    validationRules={interestRateValidation}
                    error={errors.yearlyInterestRate}
                />


                <label className="block mb-4">
                    <span className="text-gray-700">What is your preferred term of the loan in years?</span>
                    <input
                        type="range"
                        className="mt-1 block w-full"
                        min="1"
                        max="30"
                        value={yearlyLoanTerm}
                        {...register('yearlyLoanTerm', {required: true})}
                        onChange={handleTermChange}
                    />
                    <div className="flex justify-between text-xs px-2 text-black">
                        <span>1 year</span>
                        <span>{yearlyLoanTerm} years</span>
                        <span>30 years</span>
                    </div>
                </label>


                {validationError && validationError.details.map((detail: string, index: number) => (
                    <div key={index}>
                        <span className="text-red-500 text-sm">{detail}</span>
                    </div>
                ))}

                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    Calculate
                </button>
            </form>
        </div>
    )
};

export default EmiCalculator;