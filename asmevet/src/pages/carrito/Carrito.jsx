import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import authService from "../../services/auth.service";
import { Link } from "react-router-dom";

export default function Carrito() {
  const currentUser = authService.getCurrentUser();
  const [carrito, setCarrito] = useState([]);

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (idProducto) => {
    const nuevoCarrito = carrito.filter(
      (producto) => producto.id !== idProducto
    );
    setCarrito(nuevoCarrito);
  };

  // Función para calcular el total del carrito
  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
  };

  return (
    <>
      <Navbar />

      <section className="page">
        <div className="container">
          <h2 className="mb-4">Carrito de Compras</h2>

          {carrito.length === 0 ? (
            <p>Su carrito está vacío. ¡Agregue productos desde la tienda!</p>
          ) : (
            <>
              <div className="row">
                <div className="col">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carrito.map((producto) => (
                        <tr key={producto.id}>
                          <td>{producto.nombre}</td>
                          <td>${producto.precio}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => eliminarDelCarrito(producto.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col">
                  <p>Total del Carrito: ${calcularTotal()}</p>
                </div>
              </div>

              {currentUser ? (
                <div className="row mt-3">
                  <div className="col">
                    <Link to="/checkout" className="btn btn-primary">
                      Ir a Pagar
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="row mt-3">
                  <div className="col">
                    <p>
                      <Link to="/login">Inicie sesión</Link> para continuar con
                      el pago.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
