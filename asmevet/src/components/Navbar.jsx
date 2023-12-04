/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Person, BoxArrowRight, PersonCircle } from "react-bootstrap-icons";
import { FaPaw, FaUserDoctor } from "react-icons/fa6";
import AuthService from "../services/auth.service";
import "../styled-components/navbar.scss";

export default function Navbar() {
  // Estado para almacenar la información del usuario
  const [currentUser, setCurrentUser] = useState(null);

  // Estado para controlar si el menú desplegable está abierto o cerrado
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Función para cambiar el estado del menú desplegable
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();

  // Función de cierre de sesión
  const logOut = () => {
    AuthService.logout();
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    // Obtener el usuario actual al cargar el componente
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top Navbar">
      <div className="container-md">
        <Link to="/" className="navbar-brand p-2">
          ASMEVET
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav d-flex gap-5 ms-5">
            <li className="nav-item">
              <a href="#" className="nav-link">
                Inicio
              </a>
            </li>
            <Link to="/servicios" className="nav-link">
              Servicios
            </Link>
            <Link to="/productos" className="nav-link">
              Productos
            </Link>
          </ul>
        </div>
        <div className="">
          {currentUser ? (
            <div className="nav-item dropdown">
              <button
                className="nav-link p-2 dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={toggleDropdown}
              >
                <Person className="icon" />
              </button>
              <div
                className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
                aria-labelledby="navbarDropdown"
              >
                {currentUser && currentUser.roles && currentUser.roles.includes("ROLE_ADMIN") && (
                  <>
                  <Link to="/Clientes" className="dropdown-item">
                    <Person className="me-2" />
                    Clientes
                  </Link>
                  <Link to="/Veterinarios" className="dropdown-item">
                    <FaUserDoctor className="me-2" />
                    Veterinarios
                  </Link>
                  </>
                )}
                <Link to="/Animales" className="dropdown-item">
                  <FaPaw className="me-2" />
                  Mascotas
                </Link>
                <Link to="/profile" className="dropdown-item">
                  <PersonCircle className="me-2" />
                  Mi Perfil
                </Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={logOut}>
                  <BoxArrowRight className="me-2" />
                  Cerrar Sesión
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="nav-link p-2">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
