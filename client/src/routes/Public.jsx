import { Routes, Route } from "react-router-dom";
import { FaceAuthentication, Home, Register, SignIn } from "../pages";
import PublicLayout from "../layouts/PublicLayout";
import { useAuth } from "../contexts";

const PublicRoutes = () => {

    const { currentUser } = useAuth();

    return (
        <Routes>
            <Route element={<PublicLayout />} >
                <Route index element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path={`/faceauth`} element={<FaceAuthentication />} />
            </Route>
        </Routes>
    );
};

export default PublicRoutes;
