import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginFrom from "./components/LoginForm/LoginFrom";
import CreateRole from "./components/AdminTasks/RoleBased/CreateRole";
import "./App.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginFrom />} />
          <Route path="/role/ajouter-role" element={<CreateRole />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
