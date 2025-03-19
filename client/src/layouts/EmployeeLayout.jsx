import React from 'react'
import { EmployeeHeader } from '../components'
import { Outlet } from 'react-router-dom'

const EmployeeLayout = () => {
    return (
        <div>
            <EmployeeHeader />
            <div>EmployeeLayout</div>
            <Outlet />
        </div>

    )
}

export default EmployeeLayout