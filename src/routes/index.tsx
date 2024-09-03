import { Navigate } from "react-router-dom";

// Constants
import { USER_ROLES } from "@/constants";

// Pages
import * as Pages from "@/pages";

const protectedRoutes = [
  // ------------------------------ //

  // Branches
  {
    path: "/branches",
    component: <Pages.Branches />,
    permissions: [USER_ROLES.WAREHOUSE],
  },

  // Branch Orders
  {
    path: "/branch/:id/orders",
    component: <Pages.Orders />,
    permissions: [USER_ROLES.WAREHOUSE],
  },

  // ------------------------------ //

  // Catalog
  {
    path: "/catalog",
    component: <Pages.Catalog />,
    permissions: [USER_ROLES.WAREHOUSE],
  },

  // ------------------------------ //

  // Categories
  {
    path: "/categories",
    component: <Pages.Categories />,
    permissions: [USER_ROLES.WAREHOUSE],
  },

  // ------------------------------ //

  // Expenses
  {
    path: "/expenses",
    component: <Pages.Expenses />,
    permissions: [USER_ROLES.WAREHOUSE, USER_ROLES.STORE],
  },

  // ------------------------------ //

  // Products
  {
    path: "/products",
    component: <Pages.Products />,
    permissions: [USER_ROLES.WAREHOUSE],
  },

  // ------------------------------ //

  // Staff
  {
    path: "/staff",
    component: <Navigate to="/staff/sellers" />,
    permissions: [USER_ROLES.WAREHOUSE],
  },

  // Staff Drivers
  {
    path: "/staff/drivers",
    component: <Pages.Drivers />,
    permissions: [USER_ROLES.WAREHOUSE],
  },

  // Staff Sellers
  {
    path: "/staff/sellers",
    component: <Pages.Sellers />,
    permissions: [USER_ROLES.WAREHOUSE],
  },

  // Staff Workers
  {
    path: "/staff/workers",
    component: <Pages.Workers />,
    permissions: [USER_ROLES.WAREHOUSE],
  },

  // ------------------------------ //

  // Suppliers
  {
    path: "/suppliers",
    component: <Pages.Suppliers />,
    permissions: [USER_ROLES.WAREHOUSE],
  },

  // Transactions
  {
    path: "/suppliers/:id/transactions",
    component: <Pages.Transactions />,
    permissions: [USER_ROLES.WAREHOUSE],
  },

  // ------------------------------ //

  // Warehouse
  {
    path: "/warehouse",
    component: <Navigate to="/warehouse/entries" />,
    permissions: [USER_ROLES.WAREHOUSE],
  },

  // Warehouse Entries
  {
    path: "/warehouse/entries",
    component: <Pages.WarehouseEntries />,
    permissions: [USER_ROLES.WAREHOUSE],
  },

  // Warehouse New Entry
  {
    path: "/warehouse/entries/new",
    component: <Pages.WarehouseNewEntry />,
    permissions: [USER_ROLES.WAREHOUSE],
  },

  // Warehouse Entry Detail
  {
    path: "/warehouse/entries/:id",
    component: <Pages.WarehouseEntryDetails />,
    permissions: [USER_ROLES.WAREHOUSE],
  },

  // Warehouse Entry Invoice
  {
    path: "/warehouse/entries/:id/invoice",
    component: <Pages.WarehouseEntryInvoice />,
    permissions: [USER_ROLES.WAREHOUSE],
  },

  // Warehouse Items
  {
    path: "/warehouse/items",
    component: <Pages.WarehouseItems />,
    permissions: [USER_ROLES.WAREHOUSE],
  },

  // Warehouse Products
  {
    path: "/warehouse/products",
    component: <Pages.WarehouseProducts />,
    permissions: [USER_ROLES.WAREHOUSE, USER_ROLES.STORE],
  },

  // ------------------------------ //

  // My Orders
  {
    path: "/orders",
    component: <Pages.Orders />,
    permissions: [USER_ROLES.WAREHOUSE, USER_ROLES.STORE],
  },

  // New Order
  {
    path: "/orders/new",
    component: <Pages.NewOrder />,
    permissions: [USER_ROLES.WAREHOUSE, USER_ROLES.STORE],
  },

  // Order Detail
  {
    path: "/orders/:id",
    component: <Pages.OrderDetails />,
    permissions: [USER_ROLES.WAREHOUSE, USER_ROLES.STORE],
  },

  // Order Invoice
  {
    path: "/orders/:id/invoice",
    component: <Pages.OrderInvoice />,
    permissions: [USER_ROLES.WAREHOUSE, USER_ROLES.STORE],
  },

  // Order Items
  {
    path: "/orders/items",
    component: <Pages.OrderItems />,
    permissions: [USER_ROLES.WAREHOUSE, USER_ROLES.STORE],
  },

  // ------------------------------ //

  // Payments
  {
    path: "/payments",
    component: <Pages.Payments />,
    permissions: [USER_ROLES.WAREHOUSE],
  },

  // ------------------------------ //

  // Default Redirect
  {
    path: "/",
    exact: true,
    component: <Navigate to="/orders" />,
    permissions: [],
  },
];

const publicRoutes = [
  // Login
  { path: "/auth/login", component: <Pages.Login /> },

  // Logout
  { path: "/auth/logout", component: <Pages.Logout /> },
];

export { protectedRoutes, publicRoutes };
