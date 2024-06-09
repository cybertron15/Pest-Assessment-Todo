import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Tasks from "./routes/Tasks";
import Error from "./components/ErrorElement";
import Login, { action as loginAction } from "./routes/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
    errorElement: <Error />,
  },
  {
    element: <ProtectedRoute />,
    errorElement: <Error />,
    children: [
      {
        path: "/tasks",
        element: <Tasks />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);