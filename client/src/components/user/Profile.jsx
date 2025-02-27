import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate
import images from './../../assets/images'

const Profile = () => {

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate(); // Initialize navigate function

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/users/register`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();

        // Check token on app load
        const token = localStorage.getItem("token");

        if (token) {
            const decoded = jwtDecode(token);
            setCurrentUser(decoded);
            console.log(localStorage.getItem("token"));
        } else {
            // Redirect to login if token is missing
            navigate('/signin');
        }
    }, [navigate]);

    if (!currentUser) {
        return <div className="text-center text-xl mt-10">Redirecting to login...</div>;
    }

    return (
        <div className='w-fit h-full' >
            <div className=' bg-[#ffffff10] min-w-40 h-full p-4 rounded-3xl space-y-4 ' >
                <div className='w-full flex justify-center   p-1' >
                    <img src={images.Profile} alt="" srcset="" className='w-full max-w-48 rounded-full ' />
                </div>
                <div className='flex-col items-center px-4 mb-6 ' >
                    <div className='text-2xl font-gotham text-center' >{currentUser.name}</div>
                    <div className='font-main opacity-60 text-center' >{currentUser.email}</div>
                </div>
                <div className='h-fit   rounded-2xl p-4 bg-green text-dark space-y-4' >
                    <div>
                        <div className='font-main px-3 py-1 bg-white w-fit rounded-full text-sm ' >Balance</div>
                    </div>
                    <div className='w-full justify-center py-2 flex ' >
                        <h1 className='text-5xl font-gotham ' >1234.22</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile