import { Routes, Route } from "react-router-dom";
import { Home, Register, SignIn } from "../pages";
import PublicLayout from "../layouts/PublicLayout";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />} >
        <Route index element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
