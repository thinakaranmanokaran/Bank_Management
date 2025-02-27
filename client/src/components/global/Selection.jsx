import React, { useState } from 'react';
import { PiSortAscending } from "react-icons/pi";

const Selection = ({ onSort }) => {
    const [selectionData, setSelectionData] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Sort By"); // Default selection

    const ListDataSet = [
        { title: "Name", value: "customerName" },
        { title: "Date", value: "date" },
        { title: "Amount", value: "amount" },
    ];

    const handleSelect = (option) => {
        setSelectedOption(option.title); // Update selected option display
        setSelectionData(false); // Close dropdown
        onSort(option.value); // Trigger sorting in Transactions component
    };

    return (
        <div className='w-full'>
            <div className='w-full py-4 flex justify-end'>
                <div className="relative">
                    {/* Dropdown Button */}
                    <div 
                        className='flex font-jet bg-green text-dark w-fit px-6 py-2 text-lg items-center space-x-4 rounded-md cursor-pointer' 
                        onClick={() => setSelectionData(!selectionData)}
                    >
                        <div>{selectedOption}</div>
                        <PiSortAscending size={22} />
                    </div>

                    {/* Dropdown List */}
                    {selectionData && (
                        <div className='absolute right-0 z-20 bg-dark w-full mt-2 text-lg font-jet rounded-lg shadow-lg'>
                            {ListDataSet.map((Data, index) => (
                                <div 
                                    key={index} 
                                    className='w-full p-2 hover:bg-[#ffffff10] cursor-pointer'
                                    onClick={() => handleSelect(Data)}
                                >
                                    {Data.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Selection;
