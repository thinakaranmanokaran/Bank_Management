import React from 'react'
import { UserHeader } from '../components'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
    return (
        <div>
            <UserHeader />
            <div>UserLayout</div>
            <Outlet />
        </div>
    )
}

export default UserLayout