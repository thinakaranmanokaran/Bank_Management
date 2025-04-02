import React from 'react';

const InputLine = ({
  label = 'Name',
  type = 'text',
  name = '',
  id = 'inputline',
  className = '',
  value,
  onChange,
  placeholder = ' ',
  min,
  max,
  step,
  required = false,
  disabled = false,
}) => {
  return (
    <label htmlFor={id} className={`relative ${className}`}>
      {/* Input Field */}
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        required={required}
        disabled={disabled}
        className="focus:outline-0 text-lg peer w-full border-b-[1px] px-2 py-1 border-white"
      />

      {/* Floating Label */}
      <label
        htmlFor={id}
        className="absolute font-main left-2 bottom-0 text-lg transition-all duration-300 
          peer-focus:bottom-7 peer-focus:text-base peer-focus:left-0
          peer-placeholder-shown:bottom-0 peer-placeholder-shown:text-lg
          peer-[:not(:placeholder-shown)]:bottom-7 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:left-0 peer-[:not(:placeholder-shown)]:text-green"
      >
        {label}
      </label>
    </label>
  );
};

export default InputLine;
