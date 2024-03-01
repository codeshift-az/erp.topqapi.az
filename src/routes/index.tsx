import { Navigate } from "react-router-dom";

// Pages
import * as Pages from "@/pages";

const protectedRoutes = [
  // Dashboard
  { path: "/dashboard", component: <Pages.Dashboard /> },

  // Branches
  { path: "/branches", component: <Pages.Branches /> },

  // Suppliers
  { path: "/suppliers", component: <Pages.Suppliers /> },

  // Categories
  { path: "/categories", component: <Pages.Categories /> },

  // Account
  { path: "/account", component: <Pages.Account /> },

  // Default Redirect
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
];

const publicRoutes = [
  // Login
  { path: "/auth/login", component: <Pages.Login /> },

  // Logout
  { path: "/auth/logout", component: <Pages.Logout /> },
];

export { protectedRoutes, publicRoutes };
