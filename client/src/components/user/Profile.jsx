import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import images from './../../assets/images';
import { useAcc, useAuth, useBalance } from '../../contexts';

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
    const { currentUser } = useAuth();
    const { balance } = useBalance();
    const API_URL = import.meta.env.VITE_API_URL;

    const [userData, setUserData] = useState({})
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const ImageChoose = [
        { id: 1, gender: "men", img: images.Men1 },
        { id: 2, gender: "men", img: images.Men2 },
        { id: 3, gender: "men", img: images.Men3 },
        { id: 4, gender: "men", img: images.Men4 },
        { id: 5, gender: "men", img: images.Men5 },
        { id: 6, gender: "men", img: images.Men6 },
        { id: 7, gender: "men", img: images.Men7 },
        { id: 8, gender: "men", img: images.Men8 },
        { id: 9, gender: "women", img: images.Women1 },
        { id: 10, gender: "women", img: images.Women2 },
        // { id: 11, gender: "women", img: images.Women3 },
        { id: 12, gender: "women", img: images.Women4 },
        { id: 13, gender: "women", img: images.Women5 }
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/users/register/data/${currentUser?.email}`);
                setUserData(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching deposits');
            } finally {
                setLoading(false);
            }
        };

        if (currentUser?.email) {
            fetchUserData();
        }
    }, [API_URL, currentUser?.email]);

    const currentUserImage = ImageChoose.find(image => image.id === Number(userData?.img))?.img;


    return (
        <div className='w-fit h-full'>
            <div className='bg-[#ffffff10] min-w-66  p-4 rounded-3xl space-y-4'>
                <div className='w-full flex justify-center p-1'>
                    <img src={currentUserImage} alt="" className='w-full max-w-48 h-48 object-cover object-top rounded-full' />
                </div>
                <div className='flex-col items-center px-4 mb-6'>
                    <div className='text-2xl font-gotham text-center'>{currentUser?.name || 'Guest'}</div>
                    <div className='font-main opacity-60 text-center'>{currentUser?.email || 'No Account'}</div>
                </div>
                <div className='h-fit rounded-2xl p-4 bg-green text-dark space-y-4'>
                    <div>
                        <div className='font-main px-3 py-1 bg-white w-fit rounded-full text-sm'>Balance</div>
                    </div>
                    {/* {error && <h1 className='font-gotham'>{error}</h1>} */}
                    <div className='w-full justify-center py-2 flex'>
                        <h1 className='text-5xl font-gotham text-end w-full pr-2 '>{Number(balance).toLocaleString('en-IN')}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
