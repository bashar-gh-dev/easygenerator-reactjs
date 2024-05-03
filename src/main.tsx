import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { HttpClientProvider } from "./providers/http-client/HttpClientProvider";
import { AuthProvider } from "./providers/auth/AuthProvider";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HttpClientProvider>
      <AuthProvider>
        <App>
          <RouterProvider router={router} />
        </App>
      </AuthProvider>
    </HttpClientProvider>
  </React.StrictMode>
);
