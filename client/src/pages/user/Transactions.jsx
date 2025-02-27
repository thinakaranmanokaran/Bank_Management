import React, { useState } from 'react';
import { Selection } from '../../components';

const Transactions = () => {
    const [sortKey, setSortKey] = useState(null);

    const transactionsData = [
        { customerName: "Dheena", amount: 2000, time: "07:00", date: "July 07" },
        { customerName: "Arun", amount: 1500, time: "09:30", date: "July 08" },
        { customerName: "Kavya", amount: 3200, time: "12:15", date: "July 09" },
        { customerName: "Vikram", amount: 5000, time: "15:45", date: "July 10" },
        { customerName: "Sanjay", amount: 1200, time: "18:20", date: "July 11" }
    ];

    // Sorting function
    const sortedTransactions = [...transactionsData].sort((a, b) => {
        if (!sortKey) return 0;
        let valA = a[sortKey];
        let valB = b[sortKey];

        // Convert date string into a comparable format
        if (sortKey === 'date') {
            valA = new Date(valA);
            valB = new Date(valB);
        }

        return valA < valB ? -1 : 1;
    });

    return (
        <div className='w-full'>
            <div className='w-full px-4'>
                <div className='w-full justify-end text-center'>
                    <Selection onSort={(key) => setSortKey(key)} />
                </div>
                <div className='w-full grid grid-cols-2 gap-6'>
                    {sortedTransactions.map((Data, index) => (
                        <div key={index} className='space-y-5'>
                            <div className='flex items-center font-jet w-full justify-between hover:bg-[#ffffff10] p-4 rounded-2xl cursor-pointer'>
                                <div className='flex items-center'>
                                    <div className='w-16'>{Data.time}</div>
                                    <div className='flex items-center space-x-2'>
                                        <div className='bg-white text-2xl text-dark rounded-full flex items-center justify-center font-gotham leading-none w-10 h-10'>
                                            {Data.customerName.charAt(0)}
                                        </div>
                                        <div>
                                            <div className='text-lg'>{Data.customerName}</div>
                                            <div className='text-sm text-[#ffffff75]'>{Data.date}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-2xl'>{Data.amount}</div>
                            </div>
                            <hr className='border-[#ffffff40]' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Transactions;
