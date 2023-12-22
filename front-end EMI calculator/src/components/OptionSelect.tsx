import React from 'react';

import carImage from '../images/icons8-car-50.png'
import homeImage from '../images/icons8-home-50.png'
import personalImage from '../images/icons8-personal-66.png'
import ClickableOption from "./ClickableOption";

/**
 * OptionSelect Component
 *
 * This component gives multiple clickable options for the EMI calculator.
 *
 * @component
 * @param {Object} OptionSelectProps - The props for the OptionSelect component.
 * @param {any} OptionSelectProps.register - Function for registering input elements.
 * @param {string} OptionSelectProps.selectedOption - The currently selected option.
 * @param {Function} OptionSelectProps.onOptionChange - Callback function to handle option change.
 * @returns {JSX.Element} - The OptionSelect component.
 */

interface OptionSelectProps {
    register: any,
    selectedOption: string,
    onOptionChange: (option: string) => void
}

const OptionSelect: React.FC<OptionSelectProps> = ({ register, selectedOption, onOptionChange }) => {
    console.log(selectedOption)
    return (
        <div className="px-5 py-2">
            <div className="flex space-x-4 mb-4">
                <ClickableOption
                    option="car"
                    selectedOption={selectedOption}
                    image={carImage}
                    register={register}
                    onOptionChange={onOptionChange}
                />
                <ClickableOption
                    option="home"
                    selectedOption={selectedOption}
                    image={homeImage}
                    register={register}
                    onOptionChange={onOptionChange}
                />
                <ClickableOption
                    option="personal"
                    selectedOption={selectedOption}
                    image={personalImage}
                    register={register}
                    onOptionChange={onOptionChange}
                />
            </div>
        </div>
    );
};

export default OptionSelect;