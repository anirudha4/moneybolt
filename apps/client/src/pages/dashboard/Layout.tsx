import { AppBar, Sidebar } from "@components/common";
import { PATHS } from "@config/constants/paths";
import { useAuth } from "@hooks";
import { useUI } from "@hooks";
import { Navigate, Outlet } from "react-router-dom"

const Layout = () => {
    const { user } = useAuth();
    const { isSidebarOpen } = useUI();

    if (!user) return <Navigate to={PATHS.AUTH} />

    return (
        <div
            className="app-grid"
            style={{
                gridTemplateColumns: isSidebarOpen ? '240px 1fr' : '30px 1fr'
            }}
        >
            <Sidebar />
            <div className="flex flex-col">
                <AppBar />
                <div className="flex-1 p-4 bg-muted overflow-auto" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default Layout;