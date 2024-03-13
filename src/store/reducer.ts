import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import accountReducer from "./account/slice";
import authReducer from "./auth/slice";
import branchReducer from "./branch/slice";
import catalogReducer from "./catalog/slice";
import categoryReducer from "./category/slice";
import expenseReducer from "./expense/slice";
import productReducer from "./product/slice";
import driverReducer from "./staff/driver/slice";
import sellerReducer from "./staff/seller/slice";
import workerReducer from "./staff/worker/slice";
import supplierReducer from "./supplier/slice";
import warehouseCartReducer from "./warehouse/cart/slice";
import warehouseEntryReducer from "./warehouse/entry/slice";
import warehouseProductReducer from "./warehouse/product/slice";

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
});

export default rootReducer;
