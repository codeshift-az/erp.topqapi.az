import { Navigate } from "react-router-dom";

// Pages
import * as Pages from "@/pages";

const protectedRoutes = [
  // Dashboard
  { path: "/dashboard", component: <Pages.Dashboard /> },

  // Branches
  { path: "/branches", component: <Pages.Branches /> },

  // Categories
  { path: "/categories", component: <Pages.Categories /> },

  // Expenses
  { path: "/expenses", component: <Pages.Expenses /> },

  // Products
  { path: "/products", component: <Pages.Products /> },

  // Drivers
  { path: "/staff/drivers", component: <Pages.Drivers /> },

  // Sellers
  { path: "/staff/sellers", component: <Pages.Sellers /> },

  // Workers
  { path: "/staff/workers", component: <Pages.Workers /> },

  // Suppliers
  { path: "/suppliers", component: <Pages.Suppliers /> },

  // Warehouse Entries
  { path: "/warehouse/entries", component: <Pages.WarehouseEntries /> },

  // Warehouse Entry Detail
  { path: "/warehouse/entries/:id", component: <Pages.WarehouseEntryDetails /> },

  // Warehouse Products
  { path: "/warehouse/products", component: <Pages.WarehouseProducts /> },

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
