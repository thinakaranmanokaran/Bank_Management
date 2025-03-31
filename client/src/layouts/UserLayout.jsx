import React, { useEffect, useState } from 'react'
import { UserDialogBox, UserHeader, UserProfile } from '../components'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts'
import { jwtDecode } from "jwt-decode";

const UserLayout = () => {

    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [currentFace, setCurrentFace] = useState(null);

    if (!currentUser || currentUser.role !== "user") {
        navigate("/");
    }

    useEffect(() => {
        const token = localStorage.getItem("faceToken");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setCurrentFace(decoded);
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem("faceToken");
                window.location.href = '/faceauth'; // Use window.location instead
            }
        } else {
            window.location.href === '/signin' ? '' : '/signin'; // Redirect if no token
        }
    }, []); // Only runs once
    
    // console.log(currentFace?.email)
    // console.log(currentFace?.faceData)

    return (
        <div className='w-full h-full bg-dark text-white min-h-screen p-6 py-10 ' >
            <UserHeader />
            {/* <div>UserLayout</div> */}
            <div className='flex py-6 space-x-6 ' >
                <UserProfile />
                { currentFace?.face ? "" : <UserDialogBox /> }
                <Outlet />
            </div>
        </div>
    )
}

export default UserLayout