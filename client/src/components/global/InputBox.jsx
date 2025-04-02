import React, { useState } from 'react';

const InputBox = ({
    parenCN,
    labelCN,
    inputCN,
    inputType = 'text',
    placeHolder,
    inputName,
    inputValue,
    labelText = '',
    required = true,
    requiredText = '',
    showPassword = 'no',
    disabled = false,
    inputChange,
}) => {
    const [showPass, setShowPass] = useState(false);

    function togglePass() {
        setShowPass(!showPass);
    }

    // Directly use inputChange passed from parent
    const handleInputChange = (e) => {
        inputChange(e); // Pass the event to the parent
    };

    return (
        <label className={`w-full flex flex-col relative font-sfreg ${parenCN}`}>
            <input
                type={showPass ? 'text' : inputType}
                name={inputName}
                value={inputValue}
                placeholder={placeHolder}
                onChange={handleInputChange} // Properly handle the change event
                disabled={disabled}
                className={`shadow-sm  focus:border-[1px] focus:border-green outline-none focus:outline-none px-2 py-1.5 focus:pt-7 focus:pb-2 transition-all duration-300 focus:rounded-lg border-[1px] border-white peer text-white ${inputValue
                        ? 'pt-7  outline-none border-[1px] pb-2 border-green rounded-lg'
                        : 'px-2 py-1.5'
                    } ${inputCN} ${inputType === 'date' ? 'text-white [&::-webkit-calendar-picker-indicator]:invert' : ''}`}
                required={required}
            />
            <label
                className={`font-google  peer-focus:text-sm peer-focus:text-green transition-all duration-300 text-base absolute pl-2 pt-2 inline-flex items-center gap-x-[2px] ${inputValue ? 'text-green text-sm' : ''
                    } ${labelCN}`}
            >
                {labelText}
                <p>{requiredText}</p>
            </label>
            {showPassword === 'yes' && (
                <div
                    onClick={togglePass}
                    className="absolute select-none right-3 cursor-pointer top-0 h-full flex items-center"
                >
                    {showPass ? 'Hide' : 'Show'}
                </div>
            )}
        </label>
    );
};

export default InputBox;
