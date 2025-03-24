import { Routes, Route, useLocation } from "react-router-dom";
import { FaceAuthentication, Home, Register, SignIn } from "../pages";
import PublicLayout from "../layouts/PublicLayout";
import { useAuth } from "../contexts";
import { useEffect, useState } from "react";
import { Loader } from "../components";

const PublicRoutes = () => {

    const { currentUser } = useAuth();

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
