import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import accountReducer from "./account/slice";

// Auth
import authReducer from "./auth/slice";

// Branch
import branchReducer from "./branch/slice";

// Catalog
import catalogReducer from "./catalog/slice";

// Category
import categoryReducer from "./category/slice";

// Expense
import expenseReducer from "./expense/slice";

// Product
import productReducer from "./product/slice";

// Staff
import driverReducer from "./staff/driver/slice";
import sellerReducer from "./staff/seller/slice";
import workerReducer from "./staff/worker/slice";

// Supplier
import supplierReducer from "./supplier/slice";

// Warehouse
import warehouseCartReducer from "./warehouse/cart/slice";
import warehouseEntryReducer from "./warehouse/entry/slice";
import warehouseProductReducer from "./warehouse/product/slice";

// Order
import orderReducer from "./order/slice";
import orderItemReducer from "./order/item/slice";
import orderCartReducer from "./order/cart/slice";

const rootReducer = combineReducers({
  account: accountReducer,

  auth: authReducer,

  branch: branchReducer,

  catalog: catalogReducer,

  category: categoryReducer,

  expense: expenseReducer,

  product: productReducer,

  driver: driverReducer,
  seller: sellerReducer,
  worker: workerReducer,

  supplier: supplierReducer,

  warehouseCart: warehouseCartReducer,
  warehouseEntry: warehouseEntryReducer,
  warehouseProduct: warehouseProductReducer,

  order: orderReducer,
  orderItem: orderItemReducer,
  orderCart: orderCartReducer,
});

export default rootReducer;
