import React from "react";
import Projects from "./Components/CreateProject/Projects";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import IssueList from "./Components/Issues/IssueList";
import CreateIssue from "./Components/Issues/CreateIssue";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/projects" />} />
            <Route path="projects" element={<Projects />} />
            <Route path="issuelist/:projectId" element={<IssueList />} />
            <Route path="createissue/:projectId" element={<CreateIssue />} />
            </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
