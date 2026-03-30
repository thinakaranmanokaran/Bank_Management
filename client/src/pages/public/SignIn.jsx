import React, { useEffect, useState } from 'react';
import { InputBox } from '../../components';
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const SignIn = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/');
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/api/users/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                alert(data.message || "Invalid credentials");
                return;
            }

            // ✅ Store auth token
            localStorage.setItem('token', data.token);

            // ✅ Parallel API calls (faster)
            const [faceRes, accRes] = await Promise.all([
                fetch(`${API_URL}/api/users/face-token/${formData.email}`),
                fetch(`${API_URL}/api/users/accountno/${formData.email}`)
            ]);

            const faceData = await faceRes.json();
            const accData = await accRes.json();

            // console.log(faceData);
            console.log(accData);

            // ✅ Store face token
            if (faceRes.ok && faceData.success) {
                localStorage.setItem('faceToken', faceData.token);
                alert("Face token stored successfully");
            } else {
                alert("Failed to retrieve face token");
            }

            // ✅ Store account number
            if (accRes.ok && accData.success) {
                localStorage.setItem('accountToken', accData.token);
                alert(accData.accountno)
            } else {
                alert("Failed to retrieve account number");
            }

            // ✅ Reset form
            setFormData({ email: '', password: '' });

            // ✅ Redirect instead of reload
            navigate('/');
            window.location.reload(); // Optional: Only if you need to refresh the page after navigation

        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    return (
        <div>
            <div className='flex h-full justify-center items-center min-h-screen'>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col justify-center items-center space-y-4 p-16 bg-[#ffffff10] rounded-3xl'
                >
                    <h2 className='font-lato text-3xl mb-12'>Sign In</h2>

                    <div className='w-full min-w-[40vw]'>
                        <InputBox
                            labelText='E-mail'
                            inputName="email"
                            inputValue={formData.email}
                            inputChange={handleInputChange}
                        />
                    </div>

                    <div className='w-full min-w-[40vw]'>
                        <InputBox
                            labelText='Password'
                            inputName="password"
                            inputValue={formData.password}
                            inputChange={handleInputChange}
                            inputType='password'
                            showPassword='yes'
                        />
                    </div>

                    <button className='bg-green text-black w-full py-2 rounded-xl'>
                        Submit
                    </button>
                    <div className="flex justify-end w-full">
                        <Link to="/register" className='text-end cursor-pointer hover:text-green hover:underline'>
                            Doesn't have an Account?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;