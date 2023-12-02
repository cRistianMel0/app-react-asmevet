import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home/Home";
import Productos from './pages/productos/Productos';
import Servicios from './pages/servicios/Servicios';
import Login from './pages/auth/components/login.component';
import Register from './pages/auth/components/register.component';
import Profile from './pages/auth/components/profile.component';
import Veterinarios from './pages/veterinarios/Veterinarios';
import Clientes from './pages/clientes/Clientes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/productos",
    element: <Productos />,
  },
  {
    path: "/servicios",
    element: <Servicios />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/veterinarios",
    element: <Veterinarios />,
  },
  {
    path: "/clientes",
    element: <Clientes />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
