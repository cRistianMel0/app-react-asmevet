import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home/Home";
import Productos from './pages/productos/Productos';
import Servicios from './pages/servicios/Servicios';
import LoginComponent from './components/login.component';
import Register from './components/register.component';

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
    element: <LoginComponent />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
