import { Routes, Route, useLocation } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import { UserDashBoard, UserDeposit, UserFAQ, UserHome, UserLoanApplication, UserMobPay, UserPrintHistory, UserProfile, UserRecieveMoney, UserSendMoney, UserServices, UserTransactions, UserWallet, } from "../pages";
import DashBoardLayout from "../layouts/DashBoardLayout";
import { useEffect, useState } from "react";
import { Loader } from "../components";

const UserDashBoardRoutes = () => {

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
            <Route path="user/" element={<DashBoardLayout />}>
                <Route path="deposit" element={<UserDeposit />} />
                <Route path="mobpay" element={<UserMobPay />} />
                <Route path="mobpay/send" element={<UserSendMoney />} />
                <Route path="mobpay/recieve" element={<UserRecieveMoney />} />
                <Route path="print-history" element={<UserPrintHistory />} />
                <Route path="loan-application" element={<UserLoanApplication />} />
            </Route>
        </Routes>
    );
};

export default UserDashBoardRoutes;
