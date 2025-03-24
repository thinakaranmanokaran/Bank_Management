
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { EmployeeDepositApprove, EmployeeHome, EmployeeLoanApprove, EmployeeCibilScore, EmployeeProfile, EmployeeUserProfile, EmployeeUsers, EmployeeUserSearch } from '../pages';
import EmployeeLayout from '../layouts/EmployeeLayout';
import { Loader } from '../components';

const EmployeeRoutes = () => {
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
            <Route path="/employee" element={<EmployeeLayout />}>
                <Route index element={<EmployeeHome />} />
                <Route path="deposit" element={<EmployeeDepositApprove />} />
                <Route path="loan" element={<EmployeeLoanApprove />} />
                <Route path="cibil-score/d/:accountno" element={<EmployeeCibilScore />} />
                <Route path="profile" element={<EmployeeProfile />} />
                <Route path="user-profile/d/:accountno" element={<EmployeeUserProfile />} />
                <Route path="users" element={<EmployeeUsers />} />
                <Route path="user-search" element={<EmployeeUserSearch />} />
            </Route>
        </Routes>
    );
};

export default EmployeeRoutes;
