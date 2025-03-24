import React from 'react'
import { EmployeeHeader, EmployeeNavigation } from '../components'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts';

const EmployeeLayout = () => {

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    if (!currentUser || currentUser.role !== "employee") {
        navigate("/");
    }

    return (
        <div className='bg-black w-screen min-h-screen text-white p-6 ' >
            <EmployeeHeader />
            <div className='flex space-x-6 mt-6 ' >
                <EmployeeNavigation />
                <Outlet />
            </div>
        </div>

    )
}

export default EmployeeLayout