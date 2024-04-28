import React from "react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from "./app/store.js";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <React.StrictMode>
    <SnackbarProvider autoHideDuration={3000}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
  </Provider>
);
