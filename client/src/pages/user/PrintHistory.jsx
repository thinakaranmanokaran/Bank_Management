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
                if (Array.isArray(response.data)) {
                    setTransactionData(response.data);
                } else {
                    setTransactionData([]);
                }
            } catch (error) {
                setError(error.message || 'Error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [accountno, API_URL]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('en-IN');
    };

    const downloadCSV = () => {
        if (transactionData.length === 0) return;

        const headers = ['DATE', 'PARTICULARS', 'CREDIT', 'DEBIT', 'BALANCE'];
        const csvRows = transactionData.map((Data) => [
            formatDate(Data?.createdAt),
            Data?.recieveraccountno === accountno
                ? `${Data?.sendername} | ${Data?.senderemail}`
                : `${Data?.recievername} | ${Data?.recieveremail}`,
            Data?.recieveraccountno === accountno ? Data?.amount : '-',
            Data?.senderaccountno === accountno ? Data?.amount : '-',
            Data?.senderaccountno === accountno ? Data?.senderupdatebal : Data?.recieverupdatebal
        ].join(','));

        const csvContent = [headers.join(','), ...csvRows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'transaction_history.csv';
        link.click();
        URL.revokeObjectURL(url);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='h-full w-full'>
            <div className='flex w-full justify-center p-10 h-full'>
                <div className='bg-white p-6 rounded-3xl text-black font-mono w-full h-full'>
                    <table className='w-full'>
                        <thead>
                            <tr className='border-dashed border-b-1'>
                                <td className='font-semibold'>DATE</td>
                                <td className='font-semibold text-center'>PARTICULARS</td>
                                <td className='font-semibold'>CREDIT</td>
                                <td className='font-semibold'>DEBIT</td>
                                <td className='font-semibold'>BALANCE</td>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionData.length > 0 ? (
                                transactionData.map((Data) => (
                                    <tr key={Data._id} className='mt-4'>
                                        <td>{formatDate(Data?.createdAt)}</td>
                                        <td>
                                            {Data?.recieveraccountno === accountno
                                                ? `${Data?.sendername} | ${Data?.senderemail}`
                                                : `${Data?.recievername} | ${Data?.recieveremail}`
                                            }
                                            <br />
                                            {Data?.recieveraccountno === accountno ? Data?.senderaccountno : Data.recieveraccountno}
                                        </td>
                                        <td>{Data?.recieveraccountno === accountno ? Data?.amount : '-'}</td>
                                        <td>{Data?.senderaccountno === accountno ? Data?.amount : '-'}</td>
                                        <td>{Data?.senderaccountno === accountno ? Data?.senderupdatebal : Data?.recieverupdatebal}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan='5' className='border p-4 text-center'>No transactions available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className='flex justify-end mt-6' >
                        <button onClick={downloadCSV} className='mb-4 cursor-pointer px-4 py-2 bg-green text-dark rounded-2xl font-sfreg'>
                            Download CSV
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrintHistory;