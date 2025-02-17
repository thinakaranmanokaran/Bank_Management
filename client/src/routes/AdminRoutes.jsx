import React from 'react'
import { Routes, Route } from "react-router-dom";
import AdminLayout from './../layouts/AdminLayout'
import { AdminDashBoard, AdminProfile } from '../pages';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/admin" element={<AdminLayout />}>
                <Route index  element={<AdminProfile />} />
                <Route path="dashboard" element={<AdminDashBoard />} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes