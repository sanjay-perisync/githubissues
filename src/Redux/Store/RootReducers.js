

import { combineReducers } from "@reduxjs/toolkit";
import projectSliceReducer from "../Slices/Projects";
import issuesSliceReducer from "../Slices/Issue";




const rootReducer = combineReducers({
  issuesSliceReducer,
  projectSliceReducer,

});

export default rootReducer;



