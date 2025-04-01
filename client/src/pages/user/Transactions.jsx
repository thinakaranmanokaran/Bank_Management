import React, { useEffect, useState } from 'react';
import { Selection } from '../../components';
import { useAcc } from '../../contexts';
import axios from 'axios';

const Transactions = () => {
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const API_URL = import.meta.env.VITE_API_URL;
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentAcc } = useAcc();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/users/transaction/accountno/${currentAcc?.accountno}`);
                setTransactions(response.data);
            } catch (err) {
                console.error('Error fetching transactions:', err);
            } finally {
                setLoading(false);
            }
        };

        if (currentAcc?.accountno) {
            fetchTransactions();
        }
    }, [API_URL, currentAcc?.accountno]);

    const handleSort = (key) => {
        setSortKey(key);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortedTransactions = [...transactions].sort((a, b) => {
        let valA, valB;

        if (sortKey === 'date') {
            valA = new Date(a.createdAt);
            valB = new Date(b.createdAt);
        } else if (sortKey === 'name') {
            valA = a.recieveraccountno === currentAcc?.accountno ? a.sendername : a.recievername;
            valB = b.recieveraccountno === currentAcc?.accountno ? b.sendername : b.recievername;
        } else if (sortKey === 'amount') {
            valA = parseFloat(a.amount);
            valB = parseFloat(b.amount);
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <div className='w-full'>
            <div className='w-full px-4'>
                <div className='w-full justify-end text-center'>
                    <Selection onSort={handleSort} />
                </div>
                <div className='w-full grid grid-cols-2 gap-6'>
                    {sortedTransactions.map((Data) => (
                        <div key={Data._id} className='space-y-5'>
                            <div className='flex items-center font-jet w-full justify-between hover:bg-[#ffffff10] p-4 rounded-2xl cursor-pointer'>
                                <div className='flex items-center'>
                                    <div className='w-16'>{new Date(Data.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}</div>
                                    <div className='flex items-center space-x-2'>
                                        <div className='bg-white text-2xl text-dark rounded-full flex items-center justify-center font-gotham leading-none w-10 h-10'>
                                            {(currentAcc.accountno === Data.senderaccountno ? Data.recievername : Data.sendername).charAt(0)}
                                        </div>
                                        <div>
                                            <div className='text-lg'>{currentAcc.accountno === Data.senderaccountno ? Data.recievername : Data.sendername}</div>
                                            <div className='text-sm text-[rgba(255,255,255,0.46)]'>
                                                {new Date(Data.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`text-2xl ${currentAcc.accountno === Data.senderaccountno ? "text-red-500" : "text-green"}`}>{Data.amount}</div>
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