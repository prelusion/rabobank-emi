import React from 'react';
import { FieldError, UseFormRegister, Path, FieldValues, RegisterOptions } from 'react-hook-form';

/**
 * InputField Component
 *
 * This component renders an input field with a label, applying specified validation rules and displaying error messages if needed.
 *
 * @component
 * @param {Object} InputFieldProps - The props for the InputField component.
 * @param {string} InputFieldProps.label - The label for the input field.
 * @param {string} InputFieldProps.type - The input field type (e.g., "text", "number").
 * @param {Path<TFormValues>} InputFieldProps.name - The name of the input field in the form data.
 * @param {UseFormRegister<TFormValues>} InputFieldProps.register - Function for registering the input field with the form.
 * @param {RegisterOptions} InputFieldProps.validationRules - Validation rules for the input field.
 * @param {FieldError | undefined} InputFieldProps.error - Error object containing validation error details, if any.
 * @returns {JSX.Element} - The InputField component.
 */

interface InputFieldProps<TFormValues extends FieldValues> {
    label: string;
    type: string;
    name: Path<TFormValues>;
    register: UseFormRegister<TFormValues>;
    validationRules: RegisterOptions;
    error: FieldError | undefined;
}

function InputField<TFormValues extends FieldValues>({
    label,
    type,
    name,
    register,
    validationRules,
    error
}: InputFieldProps<TFormValues>) {
    return (
        <label className="block mb-4">
            <span className="text-gray-700">{label}</span>
            <input
                type={type}
                {...register(name, validationRules)}
                className={`mt-1 block w-full px-3 py-2 bg-white border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-orange-500`}
            />
            {error && <span className="text-red-500">{error.message}</span>}
        </label>
    );
}

export default InputField;