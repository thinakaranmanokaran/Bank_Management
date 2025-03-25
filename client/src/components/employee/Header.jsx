import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts';

const Header = () => {

    const { currentUser } = useAuth();  
    const navigate = useNavigate(); // Initialize navigate function

    function LogOut() {
        localStorage.removeItem("token")
        localStorage.removeItem("accountToken")
        navigate('/');
    }

    return (
        <div className='bg-dark px-6 py-4 rounded-4xl ' >
            <div className='flex justify-between items-center' >
                <div className='text-2xl font-gotham  ' >Welcome {currentUser?.name || "" }</div>
                <button className='bg-green px-10 py-3 text-xl font-main rounded-3xl cursor-pointer  text-black' onClick={LogOut} >Logout</button>
            </div>
        </div>
    )
}

export default Header