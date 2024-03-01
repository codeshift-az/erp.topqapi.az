import { Navigate } from "react-router-dom";

// Dashboard
import Dashboard from "@/pages/Dashboard";

// Branches
import Branches from "@/pages/Branches";

// Suppliers
import Suppliers from "@/pages/Suppliers";

// Categories
import Categories from "@/pages/Categories";

// Account
import Account from "@/pages/Account";

// Login
import Login from "@/pages/Auth/Login";

// Logout
import Logout from "@/pages/Auth/Logout";

const protectedRoutes = [
  // Dashboard
  { path: "/dashboard", component: <Dashboard /> },

  // Branches
  { path: "/branches", component: <Branches /> },

  // Suppliers
  { path: "/suppliers", component: <Suppliers /> },

  // Categories
  { path: "/categories", component: <Categories /> },

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
