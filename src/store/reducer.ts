import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import authReducer from "./auth/slice";
import accountReducer from "./account/slice";
import categoryReducer from "./category/slice";
import supplierReducer from "./supplier/slice";
import branchReducer from "./branch/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  category: categoryReducer,
  supplier: supplierReducer,
  branch: branchReducer,
});

export default rootReducer;
