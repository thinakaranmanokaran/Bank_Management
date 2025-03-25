import React, { useState } from 'react';
import { InputBox } from '../../components';
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const EmployeeAdd = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        gender: '',
        dob: '',
        role: '',
        position: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            // Check if the response is empty
            const text = await response.text();
            const data = text ? JSON.parse(text) : {};

            if (response.ok && data.success) {
                alert('User registered successfully!');
                localStorage.setItem('token', data.token);
                setFormData({ name: '', email: '', phone: '', password: '', gender: '', dob: '', role: '', position: '', });
            } else {
                alert(data.message || 'Something went wrong!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while registering.');
        }
    };

    const navigate = useNavigate(); // Initialize navigate function

    function LogOut() {
        localStorage.removeItem("token")
        localStorage.removeItem("accountToken")
        navigate('/');
    }

    return (
        <div>
            <button className="absolute bg-green font-main px-10 py-3 rounded-full text-xl right-6 top-6 cursor-pointer   " onClick={LogOut} >Logout</button>
            <div className='flex h-full justify-center items-center min-h-screen py-10'>
                <div className='flex flex-col justify-center items-center space-y-4 p-10 px-16 bg-[#ffffff10] rounded-3xl'>
                    <h2 className='font-lato text-3xl mb-12'>Add Employees</h2>

                    <div className='w-full min-w-[40vw]'>
                        <InputBox labelText='Name' inputType='text' parenCN='font-main' inputName="name" inputValue={formData.name} inputChange={handleInputChange} />
                    </div>
                    <div className='w-full min-w-[40vw]'>
                        <InputBox labelText='E-mail' inputType='email' parenCN='font-main' inputName="email" inputValue={formData.email} inputChange={handleInputChange} />
                    </div>
                    <div className='w-full min-w-[40vw]'>
                        <InputBox labelText='Password' inputType='password' showPassword='yes' parenCN='font-main' inputName="password" inputValue={formData.password} inputChange={handleInputChange} />
                    </div>
                    <div className='w-full min-w-[40vw]'>
                        <InputBox labelText='Phone' inputType='number' parenCN='font-main' inputName="phone" inputValue={formData.phone} inputChange={handleInputChange} />
                    </div>

                    {/* Gender Selection */}
                    <div className='flex space-x-4 mt-2 mb-5 justify-start w-full font-sfreg '>
                        <div>
                            <input type="radio" name="gender" id="male" value="Male" checked={formData.gender === "Male"} onChange={handleInputChange} className='hidden peer' />
                            <label htmlFor="male" className='bg-[#ffffff10] px-6 py-2 rounded-2xl border-[1px] hover:bg-[#ffffff20] peer-checked:bg-green   cursor-pointer transition-all duration-300 '>Male</label>
                        </div>
                        <div>
                            <input type="radio" name="gender" id="female" value="Female" checked={formData.gender === "Female"} onChange={handleInputChange} className='hidden peer' />
                            <label htmlFor="female" className='bg-[#ffffff10] px-6 py-2 rounded-2xl border-[1px] hover:bg-[#ffffff20] peer-checked:bg-green cursor-pointer transition-all duration-300'>Female</label>
                        </div>
                        <div>
                            <input type="radio" name="gender" id="other" value="Other" checked={formData.gender === "Other"} onChange={handleInputChange} className='hidden peer' />
                            <label htmlFor="other" className='bg-[#ffffff10] px-6 py-2 rounded-2xl border-[1px] hover:bg-[#ffffff20] peer-checked:bg-green cursor-pointer transition-all duration-300'>Other</label>
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <div className='w-full min-w-[40vw] flex items-center py-2 '>
                        <label className='font-main  flex-nowrap w-40 ' >Date of Birth</label>
                        <InputBox labelText='' inputType='date' parenCN='font-main' inputName="dob" inputValue={formData.dob} inputChange={handleInputChange} />
                    </div>
                    <div className='w-full min-w-[40vw]'>
                        <InputBox labelText='Role' inputType='text' parenCN='font-main' inputName="role" inputValue={formData.role} inputChange={handleInputChange} />
                    </div><div className='w-full min-w-[40vw]'>
                        <InputBox labelText='Position' inputType='text' parenCN='font-main' inputName="position" inputValue={formData.position} inputChange={handleInputChange} />
                    </div>

                    <button className='bg-green text-black w-full py-2 rounded-xl' onClick={handleSubmit}>
                        Submit
                    </button>
                    {/* <Link to="/signin" className='text-end w-full'>Already have an Account?</Link> */}
                </div>
            </div>
        </div>
    );
}

export default EmployeeAdd;
