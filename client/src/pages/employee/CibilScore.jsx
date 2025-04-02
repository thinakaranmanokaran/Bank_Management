import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from 'chart.js';
import { useBalance } from '../../contexts';

ChartJS.register(ArcElement, Tooltip, Legend);

const CibilScore = () => {
    const navigate = useNavigate();

    const { accountno } = useParams();
    const { balance } = useBalance();

    const [account, setAccount] = useState({});
    const [authData, setAuthData] = useState({});
    const [transactionData, setTransactionData] = useState({});
    const [loanData, setLoanData] = useState({});
    const [deposits, setDeposits] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL;

    const [score, setScore] = useState(0);


    const currDate = new Date();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const transactiondata = await axios.get(`${API_URL}/api/users/transaction/accountno/${accountno}`);
                setTransactionData(transactiondata.data);

                const response = await axios.get(`${API_URL}/api/users/email/${accountno}`);
                setAccount(response.data);

                const authdata = await axios.get(`${API_URL}/api/users/register/data/${response.data.email}`);
                setAuthData(authdata.data);

                const loandata = await axios.get(`${API_URL}/api/users/loan/application/${accountno}`);
                setLoanData(loandata.data);

            } catch (error) {
                setError('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Delete Deposit Function
    const handleDelete = async () => {

        const notificationData = {
            accountno: accountno,
            type: "loan",
            message: `Unfortunately, loan rejected`,
        }

        try {
            await axios.delete(`${API_URL}/api/users/loan/application/${accountno}`);
            await axios.post(`${API_URL}/api/users/notification/store`, notificationData);
            navigate('/employee/loan');
            // alert('Loan Rejected!');
            // fetchDeposits(); // Refresh Data
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting deposit');
        }
    };

    // Clear Deposit Function
    const handleClear = async () => {
        try {
            await axios.delete(`${API_URL}/api/users/loan/application/${accountno}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting deposit');
        }
    };

    const handleApprove = async () => {
        if (!window.confirm(`Are you sure you want to approve the Loan for Account No: ${accountno}?`)) return;

        const notificationData = {
            accountno: accountno,
            type: "loan",
            message: `Loan Approved!`,
        }

        try {
            const response = await axios.put(`${API_URL}/api/users/balance/${accountno}`, {
                balance: loanData?.loanamount,
            });
            await axios.post(`${API_URL}/api/users/notification/store`, notificationData);
            alert(response.data.message);
            handleClear()
            navigate('/employee/loan');
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to approve deposit');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!transactionData || !authData) {
        return <div className="text-center text-gray-600">Loading...</div>;
    }

    const formatTime = (dateString) => {
        return new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(new Date(dateString));
    };

    const formatDate = (dateString) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
        }).format(new Date(dateString));
    };

    const uniqueDates = [...new Set(transactionData.map(data => data.createdAt.split('T')[0]))];

    const transactions = transactionData?.length;
    const minbalance = Math.ceil((new Date() - new Date(authData?.createdAt)) / (1000 * 60 * 60 * 24));
    const activedays = uniqueDates.length;

    const calculateScore = () => {
        if (!transactionData.length || !authData.createdAt) return 300;

        const transactions = transactionData.length;
        const minbalance = Math.ceil((new Date() - new Date(authData.createdAt)) / (1000 * 60 * 60 * 24));
        const uniqueDates = [...new Set(transactionData.map(data => data.createdAt.split('T')[0]))];
        const activedays = uniqueDates.length;

        // const transactions = 50
        // const minbalance = 60
        // const activedays = 30

        let calculatedScore;

        // Perfect Score Condition
        if (transactions >= 50 && minbalance >= 60 && activedays >= 30) {
            calculatedScore = transactions * minbalance * activedays;
        }

        // Low Score Scenario with Multipliers
        else if (transactions <= 50 && minbalance <= 60 && activedays <= 30) {
            if (transactions < 10) {
                calculatedScore = transactions * minbalance * activedays * 150;
            } else if (transactions < 20) {
                calculatedScore = transactions * minbalance * activedays * 140;
            } else if (transactions < 30) {
                calculatedScore = transactions * minbalance * activedays * 130;
            } else if (transactions < 40) {
                calculatedScore = transactions * minbalance * activedays * 120;
            } else {
                calculatedScore = transactions * minbalance * activedays;
            }
        } else {
            // Default Case
            calculatedScore = transactions * minbalance;
        }

        // Perfect Score Condition
        if (calculatedScore <= 400) {
            calculatedScore = 500 + transactions;
            console.log(calculatedScore)
        }

        // Define score boundaries
        const minPossibleScore = 0; // Worst case
        const maxPossibleScore = 100000; // Estimated high case to avoid overflow

        // Normalize to range 300 to 900
        const normalizedScore = 400 + ((calculatedScore - minPossibleScore) / (maxPossibleScore - minPossibleScore)) * (900 - 400);

        // Ensure it is within bounds
        return Math.max(400, Math.min(900, Math.round(normalizedScore)));
    };

    const scoreValue = calculateScore();

    const data = {
        labels: ['Score', 'Remaining'],
        datasets: [
            {
                label: 'Cibil Score',
                data: [scoreValue, 1800 - scoreValue],
                backgroundColor: ['rgba(184, 240, 17, 0.8)', 'rgba(220, 220, 220, 0.3)'],
                borderColor: [`${calculateScore >= 700 ? "rgba(184, 240, 17, 1)" : calculateScore >= 500 ? "rgba(133, 133, 133, 1)" : " rgb(251 44 54)"}`, "rgba(8, 8, 8)"],
                borderWidth: 2,
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        cutout: '100%',
    };


    return (
        <div className='bg-black h-full overflow-hidden w-full ' >
            <div className='flex space-x-6  w-full' >
                <div>
                    <div className='space-y-6'>
                        <div className='bg-dark p-6 rounded-4xl min-w-80'>
                            <div className='text-light mb-8 text-base font-sfreg'>Transactions</div>
                            <div className='flex items-end space-x-4'>
                                <div className={`w-full h-1 min-w-40 rounded-4xl ${transactions >= 50 ? 'bg-green' : transactions >= 30 ? 'bg-light' : 'bg-red-500'}`}></div>
                                <div className={`text-4xl flex font-jet text-end ${transactions >= 50 ? 'text-green' : transactions >= 30 ? 'text-light' : 'text-red-500'}`}>
                                    <div>{transactions}</div>
                                    <div className='text-white'>/50</div>
                                </div>
                            </div>
                        </div>

                        <div className='bg-dark p-6 rounded-4xl min-w-80'>
                            <div className='text-light mb-8 text-base font-sfreg'>Balance Maintenance</div>
                            <div className='flex items-end space-x-4'>
                                <div className={`w-full h-1 min-w-40 rounded-4xl ${minbalance >= 60 ? 'bg-green' : minbalance >= 40 ? 'bg-light' : 'bg-red-500'}`}></div>
                                <div className={`text-4xl flex font-jet text-end ${minbalance >= 60 ? 'text-green' : minbalance >= 40 ? 'text-light' : 'text-red-500'}`}>
                                    <div>{minbalance}</div>
                                    <div className='text-white'>/60</div>
                                </div>
                            </div>
                        </div>

                        <div className='bg-dark p-6 rounded-4xl min-w-80'>
                            <div className='text-light mb-8 text-base font-sfreg'>Active Days</div>
                            <div className='flex items-end space-x-4'>
                                <div className={`w-full h-1 min-w-40 rounded-4xl ${activedays >= 30 ? 'bg-green' : activedays >= 20 ? 'bg-light' : 'bg-red-500'}`}></div>
                                <div className={`text-4xl flex font-jet text-end ${activedays >= 30 ? 'text-green' : activedays >= 20 ? 'text-light' : 'text-red-500'}`}>
                                    <div>{activedays}</div>
                                    <div className='text-white'>/30</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
                <div className=' w-full flex justify-center ' >
                    <div className='flex flex-col items-center -mt-32 ' >
                        <div className=' flex  justify-center items-end relative w-96 h-96 border-b-[1px] border-white' >
                            {/* <div className='w-80 h-80 border-green  border-[1px] rounded-full  ' ></div> */}
                            <div className='pb-6 ' >
                                <div className='font-jet text-4xl flex pb-4 ' >
                                    <div className={` mr-2 ${calculateScore >= 700 ? "text-green " : calculateScore >= 500 ? "text-light" : " text-red-500"}`} >{calculateScore()}</div>
                                    <div>/ 900</div>
                                </div>
                                <div className='font-main text-lg text-center ' >Current Cibil score</div>
                            </div>
                            <div className="w-96 h-96 -rotate-90 top-1/2 absolute  ">
                                {/* <div className='bg-white h-[1px] rotate-90  ' ></div> */}
                                <Pie data={data} options={options} />
                            </div>
                        </div>
                        <div className='flex justify-center p-4 space-x-6 relative z-20 mt-6 ' >
                            <button className={`px-20 py-3 cursor-pointer bg-red-500 rounded-3xl font-sfreg text-xl  `} onClick={() => handleDelete()} >Deny</button>
                            <button className={`px-20 py-3 cursor-pointer bg-green text-dark rounded-3xl font-sfreg text-xl  `} onClick={() => handleApprove()} >Approve</button>
                        </div>
                        <div className='relative z-20 font-sfreg text-xl mt-2  ' >
                            {calculateScore() < 500 && <div>You can deny this application; the CIBIL score is very low.</div>}
                            {calculateScore() >= 500 && calculateScore() < 700 && <div>The application is moderate; consider additional verification for approval.</div>}
                            {calculateScore() >= 700 && calculateScore() < 800 && <div>This application looks good; a few checks are recommended.</div>}
                            {calculateScore() >= 800 && <div>The CIBIL score is excellent; this application is highly recommended for approval.</div>}
                        </div>
                        {/* <div>{loanData?.loanamount}, {balance}</div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CibilScore