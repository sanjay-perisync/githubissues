import { combineReducers } from "@reduxjs/toolkit";
import issuesdetailsSlice from "./IssuesSlice";





const issuesReducer=combineReducers({
    issuesdetailsSlice
})


export default issuesReducer;
