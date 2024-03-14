import { Navigate } from "react-router-dom";

// Constants
import { USER_TYPES } from "@/constants";

// Pages
import * as Pages from "@/pages";

const protectedRoutes = [
  // Dashboard
  { path: "/dashboard", component: <Pages.Dashboard />, types: [USER_TYPES.STORE] },

  // Branches
  { path: "/branches", component: <Pages.Branches />, types: [USER_TYPES.WAREHOUSE] },

  // Catalog
  { path: "/catalog", component: <Pages.Catalog />, types: [USER_TYPES.WAREHOUSE] },

  // Categories
  { path: "/categories", component: <Pages.Categories />, types: [USER_TYPES.WAREHOUSE] },

  // My Orders
  {
    path: "/orders",
    component: <Pages.MyOrders />,
    types: [USER_TYPES.WAREHOUSE, USER_TYPES.STORE],
  },

  // All Orders
  {
    path: "/orders/all",
    component: <Pages.AllOrders />,
    types: [USER_TYPES.WAREHOUSE, USER_TYPES.STORE],
  },

  // Expenses
  { path: "/expenses", component: <Pages.Expenses />, types: [USER_TYPES.WAREHOUSE] },

  // Products
  { path: "/products", component: <Pages.Products />, types: [USER_TYPES.WAREHOUSE] },

  // Staff
  {
    path: "/staff",
    component: <Navigate to="/staff/sellers" />,
    types: [USER_TYPES.WAREHOUSE],
  },

  // Staff Drivers
  { path: "/staff/drivers", component: <Pages.Drivers />, types: [USER_TYPES.WAREHOUSE] },

  // Staff Sellers
  { path: "/staff/sellers", component: <Pages.Sellers />, types: [USER_TYPES.WAREHOUSE] },

  // Staff Workers
  { path: "/staff/workers", component: <Pages.Workers />, types: [USER_TYPES.WAREHOUSE] },

  // Suppliers
  { path: "/suppliers", component: <Pages.Suppliers />, types: [USER_TYPES.WAREHOUSE] },

  // Warehouse
  {
    path: "/warehouse",
    component: <Navigate to="/warehouse/entries" />,
    types: [USER_TYPES.WAREHOUSE],
  },

  // Warehouse Entries
  {
    path: "/warehouse/entries",
    component: <Pages.WarehouseEntries />,
    types: [USER_TYPES.WAREHOUSE],
  },

  // Warehouse New Entry
  {
    path: "/warehouse/entries/new",
    component: <Pages.WarehouseNewEntry />,
    types: [USER_TYPES.WAREHOUSE],
  },

  // Warehouse Entry Detail
  {
    path: "/warehouse/entries/:id",
    component: <Pages.WarehouseEntryDetails />,
    types: [USER_TYPES.WAREHOUSE],
  },

  // Warehouse Entry Invoice
  {
    path: "/warehouse/entries/:id/invoice",
    component: <Pages.WarehouseEntryInvoice />,
    types: [USER_TYPES.WAREHOUSE],
  },

  // Warehouse Products
  {
    path: "/warehouse/products",
    component: <Pages.WarehouseProducts />,
    types: [USER_TYPES.WAREHOUSE],
  },

  // Default Redirect
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
    types: [],
  },
];

const publicRoutes = [
  // Login
  { path: "/auth/login", component: <Pages.Login /> },

  // Logout
  { path: "/auth/logout", component: <Pages.Logout /> },
];

export { protectedRoutes, publicRoutes };
