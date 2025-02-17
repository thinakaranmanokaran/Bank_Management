import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import { UserDashBoard, UserProfile, } from "../pages";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<UserDashBoard />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
