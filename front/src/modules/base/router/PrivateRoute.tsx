import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { AppState } from "@eventhub/store/store";

const PrivateRoute: React.FC = () => {
    const { isAuthenticated } = useSelector((state: AppState) => state.auth);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
