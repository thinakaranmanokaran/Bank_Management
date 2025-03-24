import React, { useEffect, useState } from 'react';
import { Selection } from '../../components';
import { useAcc } from '../../contexts';
import axios from 'axios';

const Transactions = () => {
    const [sortKey, setSortKey] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL;
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const [debit, setDebit] = useState([]);
    const [credit, setCredit] = useState([]);

    const { currentAcc } = useAcc();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/users/transaction/accountno/${currentAcc?.accountno}`);
                setTransactions(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching deposits');
            } finally {
                setLoading(false);
            }
        };

        if (currentAcc?.accountno) {
            fetchTransactions();
        }
    }, [API_URL, currentAcc?.accountno]);

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

    // const fetchDebit = () => {
    //     if( currentAcc.accountno === transactions.map. ) {

    //     } else {

    //     }
    // }

    return (
        <div className='w-full'>
            <div className='w-full px-4'>
                <div className='w-full justify-end text-center'>
                    <Selection onSort={(key) => setSortKey(key)} />
                </div>
                <div className='w-full grid grid-cols-2 gap-6'>
                    {transactions.map((Data, index) => (
                        <div key={Data._id} className='space-y-5'>
                            <div className='flex items-center font-jet w-full justify-between hover:bg-[#ffffff10] p-4 rounded-2xl cursor-pointer'>
                                <div className='flex items-center'>
                                    <div className='w-16'> {new Date(Data.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, })} </div>
                                    <div className='flex items-center space-x-2'>
                                        <div className='bg-white text-2xl text-dark rounded-full flex items-center justify-center font-gotham leading-none w-10 h-10'>
                                            {/* {Data.customerName.charAt(0)} */} {currentAcc.accountno === Data.senderaccountno ? Data.recievername.charAt(0) : currentAcc.accountno === Data.recieveraccountno ? Data.sendername.charAt(0) : problem}
                                        </div>
                                        <div>
                                            {currentAcc.accountno === Data.senderaccountno ? <div className='text-lg'>{Data.recievername}</div> : currentAcc.accountno === Data.recieveraccountno ? <div className='text-lg'>{Data.sendername}</div> : <div>problem</div>}
                                            <div className='text-sm text-[rgba(255,255,255,0.46)]'> {new Date(Data.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', })}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`text-2xl  ${currentAcc.accountno === Data.senderaccountno ? "  text-red-500" : currentAcc.accountno === Data.recieveraccountno ? "text-green" : "text-white"} `}>{Data.amount}</div>
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
