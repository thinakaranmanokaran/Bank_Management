import React, { useState } from 'react';
import { InputLine } from '../../components';
import { useAcc } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoanApplication = () => {
    const [formData, setFormData] = useState({});
    const { currentAcc } = useAcc();
    const API_URL = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    console.log(currentAcc?.accountno)

    const notificationData = {
        accountno: currentAcc?.accountno,
        type: "loan",
        message: `Loan application sent seccessfully!  `,
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const applicationData = {
            ...formData,
            accountno: currentAcc?.accountno, // Get account number from context
        };

        try {
            const response = await fetch(`${API_URL}/api/users/loan/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(applicationData),
            });
            await axios.post(`${API_URL}/api/users/notification/store`, notificationData);

            const data = await response.json();
            if (response.ok) {
                alert('Loan application submitted successfully!');
                navigate('/user/dashboard')
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            alert('Failed to submit loan application. Please try again later.');
            console.error('Error submitting loan application:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-lato mb-4 text-center">Loan Application Form</h1>
            <div className="shadow rounded-lg p-6">
                <form onSubmit={handleSubmit} className="grid w-full gap-8">
                    {/* Personal Information */}
                    <h2 className="text-2xl font-gotham my-4 text-center">Personal Information</h2>
                    <InputLine label="Full Name" name="fullname" onChange={handleChange} required />
                    <InputLine label="Date of Birth" name="dob" onChange={handleChange} required />
                    <InputLine label="Gender" name="gender" onChange={handleChange} required />
                    <InputLine label="Contact Number" name="contact" onChange={handleChange} required />
                    <InputLine label="Email Address" name="email" type="email" onChange={handleChange} required />

                    {/* Employment Information */}
                    <h2 className="text-2xl font-gotham my-4 text-center">Employment Information</h2>
                    <InputLine label="Employment Type" name="employmenttype" onChange={handleChange} required />
                    <InputLine label="Company Name" name="companyname" onChange={handleChange} />
                    <InputLine label="Job Title" name="jobtitle" onChange={handleChange} />
                    <InputLine label="Monthly Income" name="income" type="number" onChange={handleChange} />

                    {/* Loan Details */}
                    <h2 className="text-2xl font-gotham my-4 text-center">Loan Details</h2>
                    <InputLine label="Loan Amount Requested" name="loanamount" type="number" onChange={handleChange} required />
                    <InputLine label="Loan Purpose" name="loanpurpose" onChange={handleChange} required />

                    <button className="bg-green text-dark font-gotham p-4 rounded-3xl" type="submit">
                        Submit Application
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoanApplication;
