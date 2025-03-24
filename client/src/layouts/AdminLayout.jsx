import React from 'react'
import { AdminHeader } from '../components'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts';

const AdminLayout = () => {

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    if (!currentUser || currentUser.role !== "admin") {
        navigate("/");
    }

    return (
        <div>
            <AdminHeader />
            <div>AdminLayout</div>
            <Outlet />
        </div>

    )
}

export default AdminLayout