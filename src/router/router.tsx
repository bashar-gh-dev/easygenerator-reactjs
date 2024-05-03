import { Navigate, createBrowserRouter } from "react-router-dom";
import { Main } from "../pages/Main/Main";
import { SignIn } from "../pages/SignIn/Signin";
import { SignUp } from "../pages/SignUp/SignUp";
import { IsLoggedIn } from "./guards/IsLoggedIn";
import { pages } from "../constants";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <IsLoggedIn>
        <Main />
      </IsLoggedIn>
    ),
  },
  { path: pages.SIGN_IN, element: <SignIn /> },
  { path: pages.SIGN_UP, element: <SignUp /> },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
