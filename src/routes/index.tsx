import { Navigate } from "react-router-dom";

// Dashboard
import Dashboard from "@/pages/Dashboard";

// Account
import Account from "@/pages/Account";

// Login
import Login from "@/pages/Auth/Login";

// Logout
import Logout from "@/pages/Auth/Logout";

const protectedRoutes = [
  // Dashboard
  { path: "/dashboard", component: <Dashboard /> },

  // Account
  { path: "/account", component: <Account /> },

  // Default Redirect
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
];

const publicRoutes = [
  // Login
  { path: "/auth/login", component: <Login /> },

  // Logout
  { path: "/auth/logout", component: <Logout /> },
];

export { protectedRoutes, publicRoutes };
