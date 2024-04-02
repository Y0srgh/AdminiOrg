import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginFrom from "./components/LoginForm/LoginFrom";
import "./App.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginFrom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
