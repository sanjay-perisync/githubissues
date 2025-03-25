import React from "react";
import Projects from "./Components/CreateProject/Projects";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux"; 
import { store } from "./Redux/Store";
function App() {
  return (
    <Provider store={store}> 
    <div>
      <Projects />
    </div>
    </Provider>
  );
}

export default App;
