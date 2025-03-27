import { createSlice } from "@reduxjs/toolkit";

const storedIssues = JSON.parse(localStorage.getItem("issues")) || {};

const saveToLocalStorage = (issues) => {
  localStorage.setItem("issues", JSON.stringify(issues));
};

const issuesdetailsSlice = createSlice({
  name: "Issues",
  initialState: { issuesByProject: storedIssues },
  reducers: {
    IssueListSuccess: (state, action) => {
      const { projectId, issues } = action.payload;
      state.issuesByProject[projectId] = issues;
      // localStorage.setItem("issues", JSON.stringify(state.issuesByProject));
      saveToLocalStorage(state.issuesByProject);
    },

    AddIssue: (state, action) => {
      const { projectId, issue } = action.payload;
      state.issuesByProject[projectId] = state.issuesByProject[projectId] || [];
      state.issuesByProject[projectId].push(issue);
      // localStorage.setItem("issues", JSON.stringify(state.issuesByProject));
      saveToLocalStorage(state.issuesByProject);
    },

    DeleteIssue: (state, action) => {
      const { projectId, issueId } = action.payload;
      if (state.issuesByProject[projectId]) {
        state.issuesByProject[projectId] = state.issuesByProject[projectId].filter(
          (issue) => issue.id !== issueId
        );
        // localStorage.setItem("issues", JSON.stringify(state.issuesByProject));
        saveToLocalStorage(state.issuesByProject);
      }
    },

    updateIssue: (state, action) => {
      const { projectId, issueId, updates } = action.payload;
      if (state.issuesByProject[projectId]) {
        state.issuesByProject[projectId] = state.issuesByProject[projectId].map(
          (issue) => issue.id === issueId ? { ...issue, ...updates } : issue
        );
        // localStorage.setItem("issues", JSON.stringify(state.issuesByProject));
        saveToLocalStorage(state.issuesByProject);
      }
    },

    ResetState: (state) => {
      state.issuesByProject = {};
      localStorage.removeItem("issues");
    },
  },
});

export const { IssueListSuccess, AddIssue, DeleteIssue,updateIssue, ResetState } = issuesdetailsSlice.actions;
export default issuesdetailsSlice.reducer;
