import { PATHS } from "@config/constants/paths";
import { useAuth } from "@hooks";
import { Navigate, Outlet } from "react-router-dom"

const Layout = () => {
    const { user } = useAuth();
    if(!user) return <Navigate to={PATHS.AUTH} />
    return (
        <Outlet />
    )
}
export default Layout;