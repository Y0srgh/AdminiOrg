import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import LoginFrom from "./Pages/LoginForm/LoginFrom";
import CreateRole from "./Pages/AdminTasks/RoleBased/CreateRole";
import EditRole from "./Pages/AdminTasks/RoleBased/EditRole";
import DeleteRole from "./Pages/AdminTasks/RoleBased/DeleteRole";

const App = () => {
  return (
    <SnackbarProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<LoginFrom />} />
            <Route exact path="/role/ajouter-role" element={<CreateRole />} />
            <Route exact path="/role/modifier-role/:id" element={<EditRole />} />
            <Route exact path="/role/effacer-role/:id" element={<DeleteRole />} />
          </Routes>
        </BrowserRouter>
      </div>
    </SnackbarProvider>
  );
};

export default App;
