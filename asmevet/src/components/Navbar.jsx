/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";
import { Person, BoxArrowRight, PersonCircle } from "react-bootstrap-icons";
import "../styled-components/navbar.scss";

export default function Navbar({ currentUser, logOut, isAuthenticated }) {
  console.log("currentUser:", currentUser);

  // Estado para controlar si el menú desplegable está abierto o cerrado
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Función para cambiar el estado del menú desplegable
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
              <Link to="/" className="nav-link" aria-current="page">
                Inicio
              </Link>
            </li>
            <Link to="/servicios" className="nav-item">
              <a className="nav-link">Servicios</a>
            </Link>
            <Link to="/productos" className="nav-item">
              <a className="nav-link">Productos</a>
            </Link>
          </ul>
        </div>
        <div className="">
          {isAuthenticated ? (
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
                {currentUser.username}
              </button>
              <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`} aria-labelledby="navbarDropdown">
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
            <Link to="/login" className="nav-item">
              <a className="nav-link p-2">Iniciar Sesión</a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
