import { BrowserRouter as Router } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import PublicRoutes from "./routes/Public";
import EmployeeRoutes from "./routes/EmployeeRoutes";
import UserDashBoardRoutes from "./routes/UserDashBoardRoutes";

const AppRoutes = () => {
    return (
        <Router>
            <AdminRoutes />
            <UserRoutes />
            <PublicRoutes />
            <EmployeeRoutes />
            <UserDashBoardRoutes />
        </Router>
    );
};

export default AppRoutes;
