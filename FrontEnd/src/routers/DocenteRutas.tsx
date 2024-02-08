import { RouterProvider, createBrowserRouter } from "react-router-dom";
import credencialesApi from "../api/credenciales.api";

import Inicio from "../pages/Inicio/Inicio";

import ErrorPagina from "../pages/Error/ErrorPagina";
import { DocenteLayout } from "./Layouts/DocenteLayout";

const router = createBrowserRouter([
  {
    path: "/",
    id: "rootAdmin",
    loader: () => credencialesApi.obtener_datos(),
    element: <DocenteLayout />,
    errorElement: <ErrorPagina />,
    children: [
      {
        path: "/",
        element: <Inicio />,
      },
    ],
  },
]);

export function DocenteRutas() {
  return <RouterProvider router={router} />;
}
