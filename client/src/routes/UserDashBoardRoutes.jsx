import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import { UserDashBoard, UserDeposit, UserFAQ, UserHome, UserLoanApplication, UserMobPay, UserPrintHistory, UserProfile, UserRecieveMoney, UserSendMoney, UserServices, UserTransactions, UserWallet, } from "../pages";
import DashBoardLayout from "../layouts/DashBoardLayout";

const UserDashBoardRoutes = () => {
    return (
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
