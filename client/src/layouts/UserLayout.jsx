import React from 'react'
import { UserDialogBox, UserHeader, UserProfile } from '../components'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
    return (
        <div className='w-full h-full bg-dark text-white min-h-screen p-6 py-10 ' >
            <UserHeader />
            {/* <div>UserLayout</div> */}
            <div className='flex py-6 space-x-6 ' >
                <UserProfile />
                {/* <UserDialogBox /> */}
                <Outlet />
            </div>
        </div>
    )
}

export default UserLayout