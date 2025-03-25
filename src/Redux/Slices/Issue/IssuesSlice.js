import { createSlice } from "@reduxjs/toolkit";

const issuesdetailsSlice = createSlice({
    name: "Issues",
    initialState: [],
    reducers: {
        IssuesListSuccess: (state, action) => {
           
        },
        ResetState: () => ({
            projects: [],
        }),
    },
});

export const { IssuesListSuccess, ResetState } = issuesdetailsSlice.actions;
export default issuesdetailsSlice.reducer;