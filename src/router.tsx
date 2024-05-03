import { Navigate, createBrowserRouter } from "react-router-dom";
import { Main } from "./pages/Main/Main";
import { SignIn } from "./pages/SignIn/Signin";
import { SignUp } from "./pages/SignUp/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  { path: "sign-in", element: <SignIn /> },
  { path: "sign-up", element: <SignUp /> },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
