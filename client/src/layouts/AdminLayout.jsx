import React from 'react'
import { AdminHeader } from '../components'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div>
            <AdminHeader />
            <div>AdminLayout</div>
            <Outlet />
        </div>

    )
}

export default AdminLayout