import { BrowserRouter as Router } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import PublicRoutes from "./routes/Public";
import EmployeeRoutes from "./routes/EmployeeRoutes";

const AppRoutes = () => {
    return (
        <Router>
            <AdminRoutes />
            <UserRoutes />
            <PublicRoutes />
            <EmployeeRoutes />
        </Router>
    );
};

export default AppRoutes;
