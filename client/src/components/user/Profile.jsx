import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import images from './../../assets/images';
import { useAcc, useAuth, useBalance } from '../../contexts';

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
    const { currentUser } = useAuth();
    const { balance, error } = useBalance();

    return (
        <div className='w-fit h-full'>
            <div className='bg-[#ffffff10] min-w-66 h-full p-4 rounded-3xl space-y-4'>
                <div className='w-full flex justify-center p-1'>
                    <img src={images.Profile} alt="" className='w-full max-w-48 rounded-full' />
                </div>
                <div className='flex-col items-center px-4 mb-6'>
                    <div className='text-2xl font-gotham text-center'>{currentUser?.name || 'Guest'}</div>
                    <div className='font-main opacity-60 text-center'>{currentUser?.email || 'No Account'}</div>
                </div>
                <div className='h-fit rounded-2xl p-4 bg-green text-dark space-y-4'>
                    <div>
                        <div className='font-main px-3 py-1 bg-white w-fit rounded-full text-sm'>Balance</div>
                    </div>
                    {error && <h1 className='font-gotham'>{error}</h1>}
                    <div className='w-full justify-center py-2 flex'>
                        <h1 className='text-5xl font-gotham text-end w-full pr-2 '>{balance}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
