import React, { useEffect, useState } from 'react';
import { useAcc } from '../../contexts';
import axios from 'axios';

const PrintHistory = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { currentAcc } = useAcc();
    const accountno = currentAcc?.accountno;

    const [transactionData, setTransactionData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/users/transaction/accountno/${accountno}`);
                console.log('API Response:', response.data);
                if (Array.isArray(response.data)) {
                    setTransactionData(response.data);
                } else {
                    console.error('Unexpected data format:', response.data);
                    setTransactionData([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message || 'Error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [accountno, API_URL]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(date);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return new Intl.DateTimeFormat('en-IN', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }).format(date);
    };

    return (
        <div className='h-full w-full'>
            <div className='flex w-full justify-center p-10 h-full'>
                <div className='bg-white p-6 rounded-3xl text-black font-mono w-full h-full '>
                    <table className='w-full'>
                        <thead  >
                            <tr className=' border-dashed border-b-1   '>
                                <td className=' font-semibold  '>DATE</td>
                                <td className=' font-semibold text-center '>PARTICULARS</td>
                                <td className=' font-semibold  '>CREDIT</td>
                                <td className=' font-semibold  '>DEBIT</td>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(transactionData) && transactionData.length > 0 ? (
                                transactionData.map((Data) => (
                                    <tr key={Data._id} className='mt-4'>
                                        <td className=' '>{formatDate(Data?.createdAt)}</td>
                                        <td className=' '>
                                            {Data?.recieveraccountno === accountno
                                                ? `${Data?.sendername} | ${Data?.senderemail}`
                                                : `${Data?.recievername} | ${Data?.recieveremail}`
                                            }
                                            <br />
                                            {Data?.recieveraccountno === accountno ? Data?.senderaccountno : Data.recieveraccountno}
                                        </td>
                                        <td className=' '>{Data?.recieveraccountno === accountno ? Data?.amount : '-'}</td>
                                        <td className=' '>{Data?.senderaccountno === accountno ? Data?.amount : '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan='4' className='border p-4 text-center'>No transactions available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PrintHistory;
