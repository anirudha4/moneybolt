import { Route, Routes } from "react-router-dom";
// utilities
import { PATHS } from "@config/constants/paths";
// components
import { Auth } from "@pages/auth";
import { Home, Layout } from "@pages/home";
import { Dashboard, DashboardLayout } from "@pages/dashboard";
import Transactions from "@pages/transactions";
import Invoices from "@pages/invoices";
import Integrations from "@pages/integrations";
import Configurations from "@pages/configurations";

const App = () => {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path={PATHS.AUTH} element={<Auth />} />
      <Route path={PATHS.APP} element={<DashboardLayout />}>
        <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
        <Route path={PATHS.TRANSACTIONS} element={<Transactions />} />
        <Route path={PATHS.INVOICES} element={<Invoices />} />
        <Route path={PATHS.INTEGRATIONS} element={<Integrations />} />
        <Route path={PATHS.CONFIGURE} element={<Configurations />} />
      </Route>
    </Routes>
  )
};

export default App;