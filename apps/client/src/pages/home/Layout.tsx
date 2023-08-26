import { Header } from "@components/common";
import { Container } from "@components/custom";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <Container>
                <Outlet />
            </Container>
        </div>
    )
}
export default Layout;