import { Route, Routes } from "react-router-dom";
// utilities
import { PATHS } from "@config/constants/paths";
// components
import { Auth } from "@pages/auth";
import { Home, Layout } from "@pages/home";
import { Dashboard, DashboardLayout } from "@pages/dashboard";

const App = () => {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path={PATHS.AUTH} element={<Auth />} />
      <Route path={PATHS.DASHBOARD} element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  )
};

export default App;