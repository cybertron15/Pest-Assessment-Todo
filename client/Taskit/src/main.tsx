import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Todo from "./routes/Todo";
import Error from "./components/ErrorElement";
import Login from "./routes/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    element: <ProtectedRoute isAuthenticated={false} />,
    errorElement: <Error />,
    children: [
      {
        path: "/tasks",
        element: <Todo />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);