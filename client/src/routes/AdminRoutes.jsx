import React from 'react'
import { Routes, Route } from "react-router-dom";
import AdminLayout from './../layouts/AdminLayout'
import { AdminDashBoard, AdminEmployeeAdd, AdminProfile } from '../pages';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/admin" element={<AdminLayout />}>
                <Route index  element={<AdminProfile />} />
                <Route path="dashboard" element={<AdminDashBoard />} />
                <Route path="employeeadd" element={<AdminEmployeeAdd />} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes