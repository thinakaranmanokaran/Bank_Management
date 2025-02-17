import { BrowserRouter as Router } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import PublicRoutes from "./routes/Public";

const AppRoutes = () => {
    return (
        <Router>
            <AdminRoutes />
            <UserRoutes />
            <PublicRoutes />
        </Router>
    );
};

export default AppRoutes;
