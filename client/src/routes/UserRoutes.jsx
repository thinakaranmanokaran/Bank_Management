import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import { UserDashBoard, UserFAQ, UserHome, UserProfile, UserServices, UserTransactions, UserWallet, } from "../pages";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/user" element={<UserLayout />}>
        <Route index  element={<UserHome />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="dashboard"  element={<UserDashBoard />}/>
        <Route path="faq" element={<UserFAQ />} />
        <Route path="services" element={<UserServices />} />
        <Route path="transactions" element={<UserTransactions />} />
        <Route path="wallet" element={<UserWallet />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
