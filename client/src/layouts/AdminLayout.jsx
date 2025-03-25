import React, { useEffect } from 'react'
import { AdminHeader } from '../components'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts';

const AdminLayout = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser || currentUser.role !== "admin") {
            navigate("/");
        }
    }, [currentUser, navigate]);

    if (!currentUser || currentUser.role !== "admin") {
        return null; // Prevent rendering before redirect
    }

    return (
        <div>
            {/* <AdminHeader /> */}
            <Outlet />
        </div>
    )
}

export default AdminLayout
