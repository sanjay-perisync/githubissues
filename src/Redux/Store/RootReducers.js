

import { combineReducers } from "@reduxjs/toolkit";
import issuesReducer from "../Slices/Issue";
import projectSliceReducer from "../Slices/Projects";
// import billingReducer from "../Slices/Issues";
// import productsSliceReducer from "../Slices/Products"; 




const rootReducer = combineReducers({
  issuesReducer,
  projectSliceReducer,

});

export default rootReducer;



