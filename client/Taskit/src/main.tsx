import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Todo from "./components/TodoList";
import Error from "./components/ErrorElement";
import Login from "./routes/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Todo />,
    errorElement: <Error />,
    children: [
      {
        path: "todo",
        element: <Todo />,
      },
      {
        path: "login",
        element: <Login />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);