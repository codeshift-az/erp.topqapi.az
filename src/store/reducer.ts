import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import authReducer from "./auth/slice";
import accountReducer from "./account/slice";
import categoryReducer from "./category/slice";
import supplierReducer from "./supplier/slice";
import branchReducer from "./branch/slice";
import driverReducer from "./staff/driver/slice";
import sellerReducer from "./staff/seller/slice";
import workerReducer from "./staff/worker/slice";
import productReducer from "./product/slice";
import expenseReducer from "./expense/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  category: categoryReducer,
  supplier: supplierReducer,
  branch: branchReducer,
  driver: driverReducer,
  seller: sellerReducer,
  worker: workerReducer,
  product: productReducer,
  expense: expenseReducer,
});

export default rootReducer;
