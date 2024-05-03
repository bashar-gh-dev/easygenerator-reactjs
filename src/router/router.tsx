import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { Main } from "../pages/Main/Main";
import { SignIn } from "../pages/SignIn/Signin";
import { SignUp } from "../pages/SignUp/SignUp";
import { IsLoggedIn } from "./guards/IsLoggedIn";
import { pages } from "../constants";
import { Layout } from "../components/Layout/Layout";
import { IsNotLoggedIn } from "./guards/IsNotLoggedIn";

export const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      // should be logged in
      {
        element: (
          <IsLoggedIn redirectTo={`/${pages.SIGN_IN}`}>
            <Outlet />
          </IsLoggedIn>
        ),
        children: [{ path: "", element: <Main /> }],
      },
      // should be logged out
      {
        element: (
          <IsNotLoggedIn redirectTo={`/${pages.MAIN}`}>
            <Outlet />
          </IsNotLoggedIn>
        ),
        children: [
          { path: `/${pages.SIGN_IN}`, element: <SignIn /> },
          { path: `/${pages.SIGN_UP}`, element: <SignUp /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
