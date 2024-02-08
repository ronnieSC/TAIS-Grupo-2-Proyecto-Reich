import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Ingreso from "../pages/Acceso/Ingreso";

const router = createBrowserRouter( [
    {
        path: '*',
        id: "publicAdmin",
        element: <Ingreso />,    
    }
])

export function PublicRutas() {
    return <RouterProvider router={ router } />
}