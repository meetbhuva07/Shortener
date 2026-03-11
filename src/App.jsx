import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/landing";
import Dashboard from "./Pages/dashboard";
import Auth from "./Pages/auth";
import Link from "./Pages/link";
import RedirectLink from "./Pages/redircet-link";
import Urlprovider from "./context";
import RequireAuth from "./components/require-Auth";
import AppLayout from "./layouts/app-layout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: <RequireAuth><Dashboard /></RequireAuth>,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/links/:id",
        element: <RequireAuth><Link /></RequireAuth>,
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);
function App() {
  return (
    <Urlprovider>
      <RouterProvider router={router} />
    </Urlprovider>
  );
}

export default App;
