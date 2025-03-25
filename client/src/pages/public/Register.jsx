import React, { useState } from 'react';
import { InputBox } from '../../components';
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        gender: '',
        dob: '',
        img: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const genderImg = formData.gender === 'Male' ? '2' : formData.gender === 'Female' ? '12' : 'default';
        const updatedFormData = { ...formData, img: genderImg };

        try {
            const response = await fetch(`${API_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFormData),
            });

            const text = await response.text();
            const data = text ? JSON.parse(text) : {};

            if (response.ok && data.success) {
                alert('User registered successfully!');
                localStorage.setItem('token', data.token);
                handleAccInfo(formData.email);
                setFormData({ name: '', email: '', phone: '', password: '', gender: '', dob: '', img: '' });
                navigate('/');
            } else {
                alert(data.message || 'Something went wrong!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while registering.');
        }
    };

    const handleAccInfo = async (email) => {
        try {
            const response = await fetch(`${API_URL}/api/users/balance`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert(`Account created successfully! Your Account Number: ${data.accountno}`);
                localStorage.setItem('accountToken', data.accountToken);
            } else {
                alert(data.message || 'Something went wrong!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the account.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <div className='flex h-full justify-center items-center min-h-screen py-10'>
                <div className='flex flex-col justify-center items-center space-y-4 p-10 px-16 bg-[#ffffff10] rounded-3xl'>
                    <h2 className='font-lato text-3xl mb-12'>Register</h2>

                    <div className='w-full min-w-[40vw]'>
                        <InputBox labelText='Name' inputType='text' inputName="name" inputValue={formData.name} inputChange={handleInputChange} />
                    </div>
                    <div className='w-full min-w-[40vw]'>
                        <InputBox labelText='E-mail' inputType='email' inputName="email" inputValue={formData.email} inputChange={handleInputChange} />
                    </div>
                    <div className='w-full min-w-[40vw]'>
                        <InputBox labelText='Password' inputType='password' inputName="password" inputValue={formData.password} inputChange={handleInputChange} showPassword='yes' />
                    </div>
                    <div className='w-full min-w-[40vw]'>
                        <InputBox labelText='Phone' inputType='number' inputName="phone" inputValue={formData.phone} inputChange={handleInputChange} />
                    </div>

                    <div className='flex space-x-4 mt-2 mb-5 justify-start w-full font-sfreg  '>
                        {['Male', 'Female', 'Other'].map((gender) => (
                            <div key={gender}>
                                <input type="radio" name="gender" id={gender.toLowerCase()} value={gender} checked={formData.gender === gender} onChange={handleInputChange} className='hidden peer' />
                                <label htmlFor={gender.toLowerCase()} className='bg-[#ffffff10] px-6 py-2 rounded-2xl border-[1px]  peer-checked:text-black peer-checked:bg-green cursor-pointer transition-all duration-300'>{gender}</label>
                            </div>
                        ))}
                    </div>

                    <div className='w-full min-w-[40vw] flex items-center py-2 '>
                        <label className='font-main flex-nowrap w-40'>Date of Birth</label>
                        <InputBox inputType='date' inputName="dob" inputValue={formData.dob} inputChange={handleInputChange} />
                    </div>

                    <button className='bg-green text-black w-full py-2 rounded-xl' onClick={handleSubmit}>
                        Submit
                    </button>
                    <Link to="/signin" className='text-end w-full'>Already have an Account?</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
