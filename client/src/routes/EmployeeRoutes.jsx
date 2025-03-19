import React from 'react'
import { Routes, Route } from "react-router-dom";
import { EmployeeDepositApprove, EmployeeHome, EmployeeLoanApprove } from '../pages';
import EmployeeLayout from '../layouts/EmployeeLayout';

const EmployeeRoutes = () => {
    return (
        <Routes>
            <Route path="/employee" element={<EmployeeLayout />}>
                <Route index  element={<EmployeeHome />} />
                <Route path="deposit" element={<EmployeeDepositApprove />} />
                <Route path="loan" element={<EmployeeLoanApprove />} />
            </Route>
        </Routes>
    )
}

export default EmployeeRoutes