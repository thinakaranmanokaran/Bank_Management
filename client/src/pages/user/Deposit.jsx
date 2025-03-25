import React, { useState } from 'react';
import { toWords } from 'number-to-words';
import axios from 'axios';
import { useAcc } from '../../contexts';
import { LoadingButton } from '../../components';
import { useNavigate } from 'react-router-dom';

const Deposit = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [amount, setAmount] = useState('');
    const [words, setWords] = useState('');
    // const [accountNo, setAccountNo] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const { currentAcc } = useAcc();
    const accNo = currentAcc?.accountno;
    console.log(accNo)

    const handleInputChange = (e) => {
        const value = e.target.value;
        setAmount(value);

        // Convert to words and handle empty or invalid input
        if (value === '' || isNaN(value)) {
            setWords('');
        } else {
            const numberValue = parseInt(value, 10);
            const wordOutput = numberValue === 0
                ? 'Zero Rupees'
                : `${toWords(numberValue)} Rupees`;
            setWords(wordOutput);
        }
    };

    const handleAccountChange = (e) => {
        setAccountNo(e.target.value);
    };

    const handleDeposit = async () => {
        if (!accNo || !amount) {
            setMessage('Please enter both account number and deposit amount.');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/users/deposit`, {
                accountno: accNo,
                balance: amount,
            });
            setMessage(response.data.message);
            alert("Application sent successfully!")
            navigate('/user/dashboard')
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to make a deposit');
            alert("Application not sent")
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col w-full items-center space-y-6">
                {/* Account Number Input */}
                {/* <div>{accNo}</div> */}
                {/* Amount Input */}
                <input
                    type="number"
                    value={amount}
                    onChange={handleInputChange}
                    // placeholder="Enter Amount"
                    className="w-96 rounded-2xl py-3 px-10 text-center border-[1px] border-white outline-0 text-6xl font-gotham"
                />

                {/* Display Amount in Words */}
                <div className="text-2xl font-sfpro text-white">
                    {words || 'Enter a number to Deposit'}
                </div>

                {/* Message */}
                {/* {message && <div className={`text-xl ${message === "Deposit created successfully " ?  "text-green" :"text-red-500" }`}>{message}</div>} */}

                {/* Proceed Button */}
                <button
                    className="bg-green text-black px-16 py-4 w-fit rounded-3xl font-main text-xl cursor-pointer"
                    onClick={handleDeposit}
                >
                    Proceed
                </button>
                {/* <LoadingButton /> */}
            </div>
        </div>
    );
};

export default Deposit;
