import React from "react";
import "./index.css"
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <AuthProvider>
      <>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <App />
      </>
    </AuthProvider>
  </React.StrictMode>

);