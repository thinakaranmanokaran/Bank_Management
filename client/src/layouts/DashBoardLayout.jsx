import React from 'react'
import { EmployeeHeader, UserHeader } from '../components'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts';

const DashBoardLayout = () => {

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    if (!currentUser || currentUser.role !== "user") {
        navigate("/");
    }

    return (
        <div className='w-full h-full bg-dark text-white min-h-screen p-6 py-10 '>
            <UserHeader />
            {/* <div>DashBoardLayout</div> */}
            <div className='py-6' >
                <Outlet />
            </div>
        </div>

    )
}

export default DashBoardLayout