import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import "./App.css";
import LoginFrom from "./Pages/LoginForm/LoginFrom";
import CreateRole from "./Pages/AdminTasks/RoleBased/CreateRole";
import EditRole from "./Pages/AdminTasks/RoleBased/EditRole";
import DeleteRole from "./Pages/AdminTasks/RoleBased/DeleteRole";
import HomeRole from "./Pages/AdminTasks/RoleBased/HomeRole";
import ShowRole from "./Pages/AdminTasks/RoleBased/ShowRole";

import CreateFunction from "./Pages/AdminTasks/FunctionBased/CreateFunction";
import DeleteFunction from "./Pages/AdminTasks/FunctionBased/DeleteFunction";
import EditFunction from "./Pages/AdminTasks/FunctionBased/EditFunction";

const App = () => {
  return (
    <SnackbarProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<LoginFrom />} />
            <Route exact path="/role" element={<HomeRole />} />
            <Route exact path="/role/ajouter-role" element={<CreateRole />} />
            <Route exact path="/role/modifier-role/:id" element={<EditRole />} />
            <Route exact path="/role/effacer-role/:id" element={<DeleteRole />} />
            <Route exact path="/role/detail-role/:id" element={<ShowRole />} />

            <Route exact path="/function/ajouter-function" element={<CreateFunction />} />
            <Route exact path="/function/effacer-function/:id" element={<DeleteFunction />} />
            <Route exact path="/function/modifier-function/:id" element={<EditFunction />} />

          </Routes>
        </BrowserRouter>
      </div>
    </SnackbarProvider>
  );
};

export default App;
