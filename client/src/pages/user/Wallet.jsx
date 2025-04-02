import React, { useEffect, useState } from 'react';
import axios from 'axios';
import formattedTime from '../../utils/Time';
import { useAcc, useAuth, useBalance } from '../../contexts';

const Wallet = () => {
    const { currentAcc } = useAcc();
    const { currentUser } = useAuth();
    const { balance } = useBalance();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [prevBal, setPrevBal] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/users/transaction/accountno/${currentAcc?.accountno}`);
                const transactions = response.data;

                if (transactions.length > 0) {
                    const lastTransaction = transactions[transactions.length - 1]; // Get the latest transaction
                    setPrevBal( currentAcc?.accountno === lastTransaction.senderaccountno ? lastTransaction.sendercurrbal : lastTransaction.recievercurrbal); // Set previous balance
                } else {
                    setPrevBal(balance); // If no transaction, show current balance
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching deposits');
            } finally {
                setLoading(false);
            }
        };

        if (currentAcc?.accountno) {
            fetchTransactions();
        }
    }, [API_URL, currentAcc?.accountno, balance]);

    return (
        <div>
            <div>
                <div className='text-4xl font-lato'>My Wallet</div>
                <div>
                    <div className='my-8 flex space-x-6'>
                        <div className='bg-green min-w-96 h-60 rounded-4xl flex flex-col overflow-hidden justify-between'>
                            <div className='flex justify-between font-jet p-4 px-5 text-xl items-center'>
                                <div className='bg-dark px-4 py-1 rounded-full text-base font-main'>Today</div>
                                <div className='text-dark'>{formattedTime}</div>
                            </div>
                            <div className='flex-col items-end flex font-jet pb-4'>
                                <div className='text-dark text-6xl p-4 px-5'>{Number(balance).toLocaleString('en-IN')}.00</div>
                                <div className='text-dark w-full text-lg px-4 py-1 bg-white'>{currentAcc?.accountno || '12304040404040'}</div>
                            </div>
                        </div>
                        <div className='bg-white min-w-96 h-60 rounded-4xl flex flex-col overflow-hidden justify-between'>
                            <div className='flex justify-between font-jet p-4 px-5 text-xl items-center'>
                                <div className='bg-dark px-4 py-1 rounded-full text-base font-main'>Previous</div>
                            </div>
                            <div className='flex-col items-end flex font-jet pb-4'>
                                <div className='text-dark text-6xl p-4 px-5'>{prevBal ? Number(prevBal).toLocaleString('en-IN') : '0'}.00</div>
                                <div className='text-dark w-full text-lg px-4 py-1 bg-green'>{currentUser?.name}</div>
                            </div>
                        </div>
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default Wallet;
