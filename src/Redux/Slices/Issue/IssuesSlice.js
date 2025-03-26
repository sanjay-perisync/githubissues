import { createSlice } from "@reduxjs/toolkit";

const issuesdetailsSlice = createSlice({
    name: "Issues",
    initialState: [],
   reducers: {
       issueListSuccess: (state, action) => {
         state.issues = action.payload || [];
       },
       addIssue: (state, action) => {
         state.issues.push(action.payload);
         localStorage.setItem("issues", JSON.stringify(state.issues));
       },
       deleteIssue: (state, action) => {
           state.issues = state.issues.filter(project => project.id !== action.payload);
           localStorage.setItem("issues", JSON.stringify(state.issues));
       },
       ResetState: () => [],
     },
});

export const { IssuesListSuccess,addIssue,deleteIssue, ResetState } = issuesdetailsSlice.actions;
export default issuesdetailsSlice.reducer;