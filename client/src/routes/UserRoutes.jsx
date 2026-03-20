import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { UserDashBoard, UserDeposit, UserFAQ, UserHome, UserLoanApplication, UserMobPay, UserPrintHistory, UserProfile, UserServices, UserTransactions, UserWallet, } from "../pages";
import DashBoardLayout from "../layouts/DashBoardLayout";
import { Loader } from "../components";

const UserRoutes = () => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1500); // Adjust time as needed
        if (!token && location.pathname.startsWith("/user")) {
            navigate('/register');
        }
        return () => clearTimeout(timer);
    }, [location, token]);

    return loading ? (
        <Loader />
    ) : (
        <Routes>
            <Route path="/user" element={<UserLayout />}>
                <Route index element={<UserHome />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="dashboard" element={<UserDashBoard />} />
                <Route path="faq" element={<UserFAQ />} />
                <Route path="services" element={<UserServices />} />
                <Route path="transactions" element={<UserTransactions />} />
                <Route path="wallet" element={<UserWallet />} />
            </Route>
        </Routes>
    );

};

export default UserRoutes;
