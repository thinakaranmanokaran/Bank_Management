
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { EmployeeDepositApprove, EmployeeHome, EmployeeLoanApprove, EmployeeCibilScore, EmployeeProfile, EmployeeUserProfile, EmployeeUsers, EmployeeUserSearch } from '../pages';
import EmployeeLayout from '../layouts/EmployeeLayout';

const EmployeeRoutes = () => {
    return (
        <Routes>
            <Route path="/employee" element={<EmployeeLayout />}>
                <Route index element={<EmployeeHome />} />
                <Route path="deposit" element={<EmployeeDepositApprove />} />
                <Route path="loan" element={<EmployeeLoanApprove />} />
                <Route path="cibil-score" element={<EmployeeCibilScore />} />
                <Route path="profile" element={<EmployeeProfile />} />
                <Route path="user-profile" element={<EmployeeUserProfile />} />
                <Route path="users" element={<EmployeeUsers />} />
                <Route path="user-search" element={<EmployeeUserSearch />} />
            </Route>
        </Routes>
    );
};

export default EmployeeRoutes;
