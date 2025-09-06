import type { AuthModel } from "@eventhub/modules/login-user/domain/model/auth-model";
import type { AppState } from "@eventhub/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

type RoleRouteProps = {
    allowed: AuthModel.Role[];
};

const RoleRoute: React.FC<RoleRouteProps> = ({ allowed }) => {
    const { isAuthenticated, user } = useSelector((state: AppState) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const hasAccess = allowed.includes(user.role);

    return hasAccess ? <Outlet /> : <Navigate to="/" replace />;
};

export default RoleRoute;