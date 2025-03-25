import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Deposit = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [deposits, setDeposits] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeposits = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/users/deposit`);
                setDeposits(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching deposits');
            } finally {
                setLoading(false);
            }
        };

        fetchDeposits();
    }, [API_URL]);

    const handleApprove = async (accountno, amount) => {
        if (!window.confirm(`Are you sure you want to approve the deposit for Account No: ${accountno}?`)) return;

        const notificationData = {
            accountno: accountno,
            // name: currentUser?.name,
            type: "deposit",
            message: `₹${amount} added to your account successfully!`,
        }

        try {
            const response = await axios.put(`${API_URL}/api/users/balance/${accountno}`, {
                balance: deposits.find(deposit => deposit.accountno === accountno)?.balance,
            });

            alert(response.data.message);
            handleDelete(accountno)
            // Optionally refresh deposits
            await axios.post(`${API_URL}/api/users/notification/store`, notificationData);
            setDeposits(prev => prev.filter(deposit => deposit.accountno !== accountno));
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to approve deposit');
        }
    };

    // Delete Deposit Function
    const handleDelete = async (accountno) => {
        try {
            await axios.delete(`${API_URL}/api/users/deposit/${accountno}`);
            // alert('Deposit deleted successfully!');
            // fetchDeposits(); // Refresh Data
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting deposit');
        }
    };

    return (
        <div className="w-full flex flex-col items-center  ">
            <h1 className="text-3xl font-lato text-white mb-12 w-full ">Deposit Applications</h1>

            <div className='grid grid-cols-3 w-fit gap-10 ' >
                {loading ? (
                    <div className="text-2xl font-gotham">Loading...</div>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : deposits.length === 0 ? (
                    <div className="text-2xl font-gotham">No Applications</div>
                ) : (
                    deposits.map((deposit) => (
                        <div className="bg-white text-black min-w-66 w-fit p-6 text-xl font-jet rounded-3xl">
                            <div className="space-y-2" key={deposit._id}>
                                <div className="text-base flex w-full justify-between">
                                    <div>Acc.No:</div>
                                    <div>{deposit.accountno}</div>
                                </div>
                                <div className="text-5xl text-end font-bold">₹ {deposit.balance}</div>
                                <div className="flex w-full space-x-2 mt-4">
                                    <button
                                        onClick={() => handleDelete(deposit.accountno)}
                                        className="bg-dark text-white w-full py-2 rounded-full text-lg font-main cursor-pointer"
                                    >
                                        Deny
                                    </button>
                                    <button
                                        onClick={() => handleApprove(deposit.accountno , deposit.balance)}
                                        className="bg-green w-full py-2 rounded-full text-lg font-main cursor-pointer"
                                    >
                                        Approve
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Deposit;
