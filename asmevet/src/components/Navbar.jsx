/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../styled-components/navbar.scss";

export default function Navbar({ currentUser, logOut }) {
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
          {currentUser ? (
            <button className="nav-link p-2" onClick={logOut}>
              Cerrar Sesión
            </button>
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
