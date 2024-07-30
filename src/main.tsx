import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./routes/Main.tsx";
import SignUp from "./routes/SignUp.tsx";
import SignIn from "./routes/SignIn.tsx";
import MyPage from "./routes/MyPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/sign_up",
    element: <SignUp />,
  },
  {
    path: "/sign_in",
    element: <SignIn />,
  },
  {
    path: "/my_page",
    element: <MyPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
