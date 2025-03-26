import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [], 
};

const projectdetailsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    projectListSuccess: (state, action) => {
      state.projects = action.payload || [];
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    deleteProject: (state, action) => {
        state.projects = state.projects.filter(project => project.id !== action.payload);
        localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    ResetState: () => initialState,
  },
});

export const { projectListSuccess, addProject,deleteProject, ResetState } = projectdetailsSlice.actions;
export default projectdetailsSlice.reducer;
