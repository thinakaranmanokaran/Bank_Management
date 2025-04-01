import React, { useState } from 'react';
import { useAcc, useAuth, useBalance } from '../../contexts';
import axios from 'axios';
import images from '../../assets/images';
import { useNavigate } from 'react-router-dom';

const MobPay = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    const { balance } = useBalance();
    const { currentAcc } = useAcc();
    const { currentUser } = useAuth();

    const [accNumber, setAccNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const [ senderCB, setSenderCB ] = useState('');
    const [ senderUB, setSenderUB ] = useState('');
    const [ recieverCB, setRecieverCB ] = useState('');
    const [ recieverUB, setRecieverUB ] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleAccChange = (e) => {
        const input = e.target.value;
        if (/^\d{0,12}$/.test(input)) {
            setAccNumber(input);
        }
    };

    const handleAmountChange = (e) => {
        const input = e.target.value;
        if (/^\d*$/.test(input)) {
            setAmount(input);
        }
    };

    const handleVerify = async () => {
        try {
            const emailResponse = await axios.get(`${API_URL}/api/users/email/${accNumber}`);
            setEmail(emailResponse.data.email);
    
            const nameResponse = await axios.get(`${API_URL}/api/users/name/${emailResponse.data.email}`);
            setName(nameResponse.data.name);
    
            const senderCurrBal = await axios.get(`${API_URL}/api/users/balance/${currentAcc?.accountno}`);
            const recieverCurrBal = await axios.get(`${API_URL}/api/users/balance/${accNumber}`);
    
            const senderBalance = Number(senderCurrBal.data.account.balance);
            const recieverBalance = Number(recieverCurrBal.data.account.balance);
            const transferAmount = Number(amount);
    
            setSenderCB(senderBalance);
            setRecieverCB(recieverBalance);
    
            // Correct balance calculations
            setSenderUB(senderBalance - transferAmount);
            setRecieverUB(recieverBalance + transferAmount);
    
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching data');
        }
    };
    

    const handleTransaction = async () => {
        const transactionData = {
            senderaccountno: currentAcc?.accountno,
            sendername: currentUser?.name,
            senderemail: currentUser?.email,
            recieveraccountno: accNumber,
            recievername: name,
            recieveremail: email,
            amount,
            recievercurrbal: recieverCB ,
            recieverupdatebal: recieverUB,
            sendercurrbal: senderCB,
            senderupdatebal: senderUB,
        };

        const notificationData = {
            accountno: accNumber,
            name: currentUser?.name,
            type: "transaction",
            message: `${name} sent ₹${amount} to your account `,
        }

        try {
            // Step 1: Create Transaction
            await axios.post(`${API_URL}/api/users/transaction`, transactionData);


            // Step 2: Deduct Amount from Sender's Balance
            await axios.put(`${API_URL}/api/users/balance/${currentAcc?.accountno}`, {
                balance: -Number(amount), // Deduct from sender
            });

            // Step 3: Add Amount to Receiver's Balance
            await axios.put(`${API_URL}/api/users/balance/${accNumber}`, {
                balance: Number(amount), // Add to receiver
            });

            await axios.post(`${API_URL}/api/users/notification/store`, notificationData);

            setSuccess("Transaction successful!");
            alert("Money sent successfully!")
            navigate('/user/dashboard')
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Transaction failed');
            alert("Money not sent ")
            // alert(error)
        }
    };


    const isInvalidAmount = Number(amount) > balance;
    const isDisabled = !accNumber || !amount || isInvalidAmount;
    const cantSend = !name;

    return (
        <div className='flex flex-col items-center'>
            <div className='flex space-x-8 justify-center mt-2'>
                {/* Sender Card */}
                <div className='bg-[#ffffff10] p-6 rounded-4xl w-fit min-w-80 max-w-96'>
                    <div className='space-y-6'>
                        <h1 className='font-gotham text-4xl'>Sender</h1>
                        <div className='flex font-sfpro space-x-2 text-xl'>
                            <div>Acc.No:</div>
                            <div>{currentAcc?.accountno}</div>
                        </div>
                        {/* <div className='flex font-sfpro space-x-2 text-xl'>
                            <div>Name:</div>
                            <div>{currentUser?.name}</div>
                        </div>
                        <div className='flex font-sfpro space-x-2 text-xl'>
                            <div>Email:</div>
                            <div>{currentUser?.email}</div>
                        </div> */}
                        <div className='flex font-sfpro space-x-2 text-xl'>
                            <div>Current Bal:</div>
                            <div>{balance}</div>
                        </div>
                    </div>
                </div>

                {/* Receiver Card */}
                <div className='bg-[#ffffff10] p-6 rounded-4xl w-fit min-w-80 max-w-96'>
                    <div className='space-y-6'>
                        <h1 className='font-gotham text-4xl'>Receiver</h1>
                        <div className='flex font-sfpro items-end space-x-2 text-xl'>
                            <div>Acc.No:</div>
                            <input type='number' className='border-b-[1px] border-white w-full focus:outline-none text-end font-jet' maxLength={12} value={accNumber} onChange={handleAccChange} />
                        </div>
                        <div>
                            <label className='relative'>
                                <input
                                    className={`py-2 border-b-[1px] border-white w-full focus:outline-none text-5xl text-end font-jet peer ${isInvalidAmount ? 'text-red-500' : 'text-green'}`}
                                    type='number'
                                    value={amount}
                                    onChange={handleAmountChange}
                                />
                                <label className={`font-sfpro absolute left-0 peer-focus:bottom-12 peer-focus:text-xl ${amount ? 'bottom-12 text-xl' : '-bottom-4 text-3xl'} transition-all duration-300 ${isInvalidAmount ? 'text-red-500' : 'text-white '}`}>{isInvalidAmount ? 'Insufficient Balance' : 'Enter an Amount'}</label>
                            </label>
                        </div>
                        <div className={`flex items-center ${error ? "justify-between" : "justify-end"}`}>
                            {error && <div className='text-red-500 text-lg font-sfpro'>{error}</div>}
                            <button className='bg-green text-dark font-sfpro px-8 py-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-2xl' disabled={isDisabled} onClick={handleVerify}>{name ? "Verified" : "Verify"}</button>
                        </div>
                    </div>
                </div>

                {/* Profile Display */}
                {name && (
                    <div className='bg-[#ffffff10] p-6 rounded-4xl w-fit min-w-80 flex flex-col items-center max-w-96'>
                        <img src={images.Profile} className='rounded-full w-40' alt="Profile" />
                        <div className='text-3xl font-gotham mt-6'>{name}</div>
                        <div className='text-xl font-main mt-1'>{email}</div>
                    </div>
                )}
            </div>

            {/* Transaction Button */}
            <div>
                <button
                    className='flex text-2xl text-dark bg-green px-16 py-4 rounded-4xl font-gotham mt-8 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                    disabled={cantSend}
                    onClick={handleTransaction}
                >
                    Send Money
                </button>
                {/* {success && <div className='text-green-500 text-xl mt-4'>{success}</div>}
                {error && <div className='text-red-500 text-xl mt-4'>{error}</div>} */}
            </div>
        </div>
    );
};

export default MobPay;
