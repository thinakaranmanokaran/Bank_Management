import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useBalance } from '../../contexts'
import { WiStars } from "react-icons/wi";
import images from '../../assets/images'

const UserProfile = () => {
    const { accountno } = useParams();

    if (!accountno) {
        return <div>You Need a Account No</div>
    }

    // const { balance } = useBalance(); 
    const API_URL = import.meta.env.VITE_API_URL;

    const [account, setAccount] = useState({});
    const [authData, setAuthData] = useState({});
    const [transactionData, setTransactionData] = useState({});
    const [loanData, setLoanData] = useState({});
    const [balance, setBalance] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                // 1️⃣ Account Data
                let accountRes;
                try {
                    accountRes = await axios.get(`${API_URL}/api/users/email/${accountno}`);
                    setAccount(accountRes.data);
                } catch (err) {
                    console.error("Account API Error:", err.response?.data || err.message);
                }

                // 2️⃣ Balance
                try {
                    const balanceRes = await axios.get(`${API_URL}/api/users/balance/${accountno}`);
                    setBalance(balanceRes.data);
                } catch (err) {
                    console.error("Balance API Error:", err.response?.data || err.message);
                }

                // 3️⃣ Auth (only if account exists)
                if (accountRes?.data?.email) {
                    try {
                        const authRes = await axios.get(
                            `${API_URL}/api/users/register/data/${accountRes.data.email}`
                        );
                        setAuthData(authRes.data);
                    } catch (err) {
                        console.error("Auth API Error:", err.response?.data || err.message);
                    }
                }

                // 4️⃣ Transactions
                try {
                    const txnRes = await axios.get(
                        `${API_URL}/api/users/transaction/accountno/${accountno}`
                    );
                    setTransactionData(txnRes.data);
                } catch (err) {
                    console.error("Transaction API Error:", err.response?.data || err.message);
                }

                // 5️⃣ Loan
                try {
                    const loanRes = await axios.get(
                        `${API_URL}/api/users/loan/application/${accountno}`
                    );
                    setLoanData(loanRes.data);
                } catch (err) {
                    console.error("Loan API Error:", err.response?.data || err.message);
                }

            } catch (error) {
                // fallback (rare case)
                console.error("Unexpected Error:", error);
                setError("Unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [accountno, API_URL]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // ✅ BEAUTIFUL ERROR CARD UI
    if (error) {
        return (
            <div className="w-full flex items-center justify-center">
                <div className="bg-dark text-light p-10 rounded-4xl shadow-lg max-w-md w-full text-center space-y-4">

                    <h2 className="text-2xl font-bold text-red-400">
                        Oops! Something went wrong
                    </h2>

                    <p className="text-gray-300">
                        {error}
                    </p>

                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-green text-dark px-6 py-2 rounded-full hover:scale-105"
                        >
                            Retry
                        </button>

                        <Link to="/employee/dashboard">
                            <button className="bg-gray-600 px-6 py-2 rounded-full hover:scale-105">
                                Go Back
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleSubmit = async () => {
        const notificationData = {
            accountno: accountno,
            type: "loan",
            message: `Approval in Progress `,
        }
        try {
            await axios.post(`${API_URL}/api/users/notification/store`, notificationData);
            // alert("notification sent")
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            {/* <h1>User Profile</h1> */}
            <div className='flex space-x-6 py-4 ' >
                <div>
                    <div className="text-2xl font-gotham mb-4 ">Registration Application</div>
                    <div className='bg-dark p-10 text-lg font-sfreg space-y-4 rounded-4xl h-fit' >
                        <div className="flex space-x-2 ">
                            <p className='text-light  ' >Account Number: </p> <div>{accountno}</div>
                        </div>
                        <div className="flex space-x-2 ">
                            <p className='text-light  ' >Email: </p> <div>{account?.email}</div>
                        </div>
                        <div className="flex space-x-2 ">
                            <p className='text-light  ' >Name: </p> <div>{authData?.name}</div>
                        </div>
                        <div className="flex space-x-2 ">
                            <p className='text-light  ' >Email: </p> <div>{authData?.email}</div>
                        </div>
                        <div className="flex space-x-2 ">
                            <p className='text-light  ' >Phone: </p> <div>{authData?.phone}</div>
                        </div>
                        <div className="flex space-x-2 ">
                            <p className='text-light  ' >Gender: </p> <div>{authData?.gender}</div>
                        </div>
                        <div className="flex space-x-2 ">
                            <p className='text-light  ' >Role: </p> <div>{authData?.role}</div>
                        </div>
                        <div className="flex space-x-2 ">
                            <p className='text-light  ' >Registered at: </p><div>{new Date(authData?.createdAt).toLocaleDateString()}</div>
                        </div>
                    </div>
                    <Link to={`/employee/cibil-score/d/${accountno}`} onClick={handleSubmit}  >
                        <div className=' w-full text-center cursor-pointer font-sfpro  bg-green text-dark py-4 rounded-3xl text-xl mt-6 flex items-center justify-center space-x-4 group' > <span>Check Cibil Score</span> <img src={images.Star} className='w-8 h-8 -ml-3 group-hover:scale-105 duration-300' alt="" srcSet="" /> </div>
                    </Link>
                </div>
                <div>
                    <div className='flex space-x-6 mb-6 ' >
                        <div className='bg-dark h-fit text-light p-10 text-lg font-sfreg space-y-4 rounded-4xl ' >
                            <div className='mr-20' >Transactions Did: </div><div className='text-end font-jet text-4xl text-green ' >{transactionData?.length || 0}</div>
                        </div>
                        <div className='bg-dark h-fit text-light p-10 text-lg font-sfreg space-y-4 rounded-4xl ' >
                            <div className='mr-20' >Bank Balance: </div>
                            <div className='text-end font-jet text-4xl text-green ' >{balance?.account?.balance}</div>
                        </div>
                    </div>
                    <div className="text-2xl font-gotham mb-4 ">Loan Application</div>
                    <div className='bg-dark p-10 text-lg font-sfreg space-y-4 rounded-4xl'>
                        <div className="flex space-x-2">
                            <p className='text-light'>Account Number:</p> <div>{loanData?.accountno}</div>
                        </div>
                        <div className="flex space-x-2">
                            <p className='text-light'>Full Name:</p> <div>{loanData?.fullname}</div>
                        </div>
                        <div className="flex space-x-2">
                            <p className='text-light'>Date of Birth:</p> <div>{loanData?.dob}</div>
                        </div>
                        <div className="flex space-x-2">
                            <p className='text-light'>Gender:</p> <div>{loanData?.gender}</div>
                        </div>
                        <div className="flex space-x-2">
                            <p className='text-light'>Contact:</p> <div>{loanData?.contact}</div>
                        </div>
                        <div className="flex space-x-2">
                            <p className='text-light'>Email:</p> <div>{loanData?.email}</div>
                        </div>
                        <div className="flex space-x-2">
                            <p className='text-light'>Employment Type:</p> <div>{loanData?.employmenttype}</div>
                        </div>
                        <div className="flex space-x-2">
                            <p className='text-light'>Company Name:</p> <div>{loanData?.companyname}</div>
                        </div>
                        <div className="flex space-x-2">
                            <p className='text-light'>Job Title:</p> <div>{loanData?.jobtitle}</div>
                        </div>
                        <div className="flex space-x-2">
                            <p className='text-light'>Income:</p> <div>₹{loanData?.income}</div>
                        </div>
                        <div className="flex space-x-2">
                            <p className='text-light'>Loan Amount:</p> <div>₹{loanData?.loanamount}</div>
                        </div>
                        <div className="flex space-x-2">
                            <p className='text-light'>Loan Purpose:</p> <div>{loanData?.loanpurpose}</div>
                        </div>
                        <div className="flex space-x-2">
                            <p className='text-light'>Applied at:</p> <div>{new Date(loanData?.submittedat).toLocaleDateString()}</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserProfile;
