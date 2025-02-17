import React from 'react'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
    return (
        <div className='bg-dark text-white ' >
            <Outlet />
        </div>
    )
}

export default PublicLayout