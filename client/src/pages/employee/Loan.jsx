import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoanDetails = () => {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/users/loan/applications/`);
                setApplications(response.data);
            } catch (error) {
                setError('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (!applications) {
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

    const handleSubmit  = async (Data) => {
        
        const notificationData = {
            accountno: Data?.accountno,
            type: "loan",
            message: `Reviewing Documents & Checking Eligibility, be patient `,
        }
        try {
            await axios.post(`${API_URL}/api/users/notification/store`, notificationData);
            // alert("notification sent")
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className=' w-full' >
            <div className='flex justify-center' >
                {
                    loading ? (
                        <div className="text-2xl font-gotham">Loading...</div>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : applications.length === 0 ? (
                        <div className="text-2xl font-gotham">No Applications</div>
                    ) : (
                        <div className='grid grid-cols-2 w-full gap-6 mr-12 ' >
                            {
                                applications.map((Data) => (
                                    <div className='bg-dark m-4 w-full p-6  rounded-4xl font-main text-lg space-y-4  ' key={Data._id} >
                                        <div className='flex flex-col items-end font-sfpro' >
                                            <div className='' ><span >{formatDate(Data.submittedat)}</span></div>
                                            <div className='' ><span >{formatTime(Data.submittedat)}</span></div>
                                        </div>
                                        <div>Full Name: <span className='text-green'>{Data.fullname}</span></div>
                                        <div>Date of Birth: <span className='text-green'>{Data.dob}</span></div>
                                        <div>Gender: <span className='text-green'>{Data.gender}</span></div>
                                        <div>Contact: <span className='text-green'>{Data.contact}</span></div>
                                        <div>Email: <span className='text-green'>{Data.email}</span></div>
                                        <div>Account Number: <span className='text-green'>{Data.accountno}</span></div>
                                        <div>Employment Type: <span className='text-green'>{Data.employmenttype}</span></div>
                                        <div>Company Name: <span className='text-green'>{Data.companyname}</span></div>
                                        <div>Job Title: <span className='text-green'>{Data.jobtitle}</span></div>
                                        <div>Income: <span className='text-green'>₹{Data.income}</span></div>
                                        <div>Loan Amount: <span className='text-green'>₹{Data.loanamount}</span></div>
                                        <div>Loan Purpose: <span className='text-green'>{Data.loanpurpose}</span></div>
                                        <Link className='' to={`/employee/user-profile/d/${Data.accountno}`} ><div className='bg-green text-dark  text-center py-2 mt-2 rounded-2xl font-sfpro cursor-pointer ' onClick={() => handleSubmit(Data)} >Explore more</div></Link>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default LoanDetails;
