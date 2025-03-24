import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import AdminLayout from './../layouts/AdminLayout'
import { AdminDashBoard, AdminEmployeeAdd, AdminProfile } from '../pages';
import { Loader } from '../components';

const AdminRoutes = () => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1500); // Adjust time as needed
        return () => clearTimeout(timer);
    }, [location]);

    return loading ? (
        <Loader />
    ) : (
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