import React from "react";

/**
 * ClickableOption Component
 *
 * This component gives multiple clickable options for the EMI calculator.
 *
 * @component
 * @param {string} ClickableOptionProps.option - The EMI option such as (Car, Home or Personal).
 * @param {string} OptionSelectProps.register - Function for registering input elements.
 * @param {string} ClickableOptionProps.selectedOption - The currently selected option.
 * @param {Function} OptionSelectProps.onOptionChange - Callback function to handle option change.
 * @returns {JSX.Element} - The ClickableOption component.
 */

interface ClickableOptionProps {
    option: string
    selectedOption: string
    image: any
    register: any
    onOptionChange: any
}

const ClickableOption: React.FC<ClickableOptionProps> = ({ option, selectedOption, image, register, onOptionChange }) => {
    return (
          <label
            className={`cursor-pointer flex-1 border-2 p-2 rounded-md focus:outline-none ${
                selectedOption === option ? 'border-orange-500 bg-orange-200' : 'border-transparent'
            }`}
            onClick={() => onOptionChange(option)}
        >
            <input
                type="radio"
                value={option}
                {...register("emiOption")}
                style={{ display: "none" }}
                checked={selectedOption === option}
                readOnly
            />
            <img src={image} alt={option.charAt(0).toUpperCase() + option.slice(1)} className="w-full"/>
        </label>
    );
};


export default ClickableOption;