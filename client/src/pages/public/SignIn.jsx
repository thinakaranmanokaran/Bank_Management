import React, { useEffect, useState } from 'react'
import { InputBox } from '../../components'
import { Link, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const SignIn = () => {

    const navigate = useNavigate();
    const [faceToken, setFaceToken] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/users/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {

                // Fetch face token AFTER login success
                try {
                    const faceTokenResponse = await fetch(`${API_URL}/api/users/face-token/${formData.email}`);
                    const faceTokenData = await faceTokenResponse.json();

                    if (faceTokenResponse.ok && faceTokenData.success) {
                        const token = faceTokenData.faceToken;

                        setFaceToken(token);
                        localStorage.setItem('faceToken', token);
                    } else {
                        console.warn('Face token error:', faceTokenData.message);
                    }
                } catch (err) {
                    console.error('Face token fetch error:', err);
                }

                alert('User signed in successfully!');
                localStorage.setItem('token', data.token);

                handleAccInfo(formData.email);
                handleFaceInfo(formData.email);

                setFormData({ email: '', password: '' });

                window.location.reload();

            } else {
                alert(data.message || 'Invalid credentials!');
            }

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while signing in.');
        }
    };

    const handleAccInfo = async (email) => {
        try {
            const response = await fetch(`${API_URL}/api/users/balance/set`, {
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

    const handleFaceInfo = async (email) => {
        try {
            const response = await fetch(`${API_URL}/api/users/store-face/set`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert(`Account created successfully! Your Account Number: ${data.accountno}`);
                localStorage.setItem('faceToken', data.faceToken);
            } else {
                alert(data.message || 'Something went wrong!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the account.');
        }
    };


    return (
        <div  >
            <div className=' flex h-full justify-center items-center min-h-screen ' >
                <form onSubmit={handleSubmit} className=' flex flex-col justify-center items-center space-y-4 p-16 bg-[#ffffff10] rounded-3xl  ' >
                    <h2 className='font-lato text-3xl mb-12 ' >SignIn</h2>
                    <div className='w-full min-w-[40vw] ' >
                        <InputBox labelText='E-mail' inputName="email" inputValue={formData.email} inputChange={handleInputChange} parenCN='font-main' />
                    </div>
                    <div className='w-full min-w-[40vw] ' >
                        <InputBox labelText='Password' inputName="password" inputValue={formData.password} inputChange={handleInputChange} inputType='password' showPassword='yes' parenCN='font-main' />
                    </div>
                    <button className='bg-green text-black w-full py-2 rounded-xl ' >
                        Submit
                    </button>
                    <Link to="/register" className='text-end w-full' >Doesn't have an Account ?</Link>
                </form>
            </div>
        </div>
    )
}

export default SignIn