import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [], 
};


const updateLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
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
      // localStorage.setItem("projects", JSON.stringify(state.projects));
      updateLocalStorage("projects", state.projects);
    },


    deleteProject: (state, action) => {
      const projectId = action.payload;
      state.projects = state.projects.filter(project => project.id !== projectId);
      // localStorage.setItem("projects", JSON.stringify(state.projects));
      updateLocalStorage("projects", state.projects);

      
      const storedIssues = JSON.parse(localStorage.getItem("issues")) || {};
      delete storedIssues[projectId]; 
      // localStorage.setItem("issues", JSON.stringify(storedIssues));
      updateLocalStorage("issues", storedIssues);
    },


    updateProject: (state, action) => {
      const { id, newTitle } = action.payload;
      state.projects = state.projects.map(project => 
        project.id === id ? { ...project, title: newTitle } : project
      );
      // localStorage.setItem("projects", JSON.stringify(state.projects));
      updateLocalStorage("projects", state.projects);
    },
    
    ResetState: () => {
      localStorage.removeItem("projects");
      localStorage.removeItem("issues");
      return initialState;
    },
  },
});

export const { projectListSuccess, addProject, deleteProject, updateProject, ResetState } = projectdetailsSlice.actions;
export default projectdetailsSlice.reducer;
