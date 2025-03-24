import React, { useState } from 'react';

const LoadingButton = ({
    text = 'Submit',
    loadingText = 'Loading...',
    successText = 'Success',
    onClick,
    loadingDuration = 3000,
    successDuration = 2000,
    className = '',
    loadingClassName = 'bg-green w-16',
    successClassName = 'bg-green w-32',
    defaultClassName = 'bg-green w-32'
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        if (onClick) await onClick();
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), successDuration);
        }, loadingDuration);
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading || isSuccess}
            className={`relative overflow-hidden px-6 py-3 font-main text-black rounded-lg transition-all duration-300 ease-in-out ${isLoading ? loadingClassName : isSuccess ? successClassName : defaultClassName
                } ${className}`}
        >
            {isLoading ? (
                <div className="flex items-center justify-center transition-all duration-300 w-full">
                    <div className='w-6 h-6 bg-transparent border-t-3 animate-spin border-black rounded-full'></div>
                </div>
            ) : isSuccess ? (
                <span className="text-black">{successText}</span>
            ) : (
                <span className="transition-all duration-300">{text}</span>
            )}
        </button>
    );
};

export default LoadingButton;
