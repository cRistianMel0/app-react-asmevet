import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import authService from "../../services/auth.service";
import carritosService from "../../services/carritos.service";


export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Verificar si el usuario está autenticado
        if (currentUser) {
          const response = await carritosService.obtenerProductosEnCarrito(currentUser.id);

          const productosEnCarrito = response.data.productosEnCarrito;
          setCarrito(productosEnCarrito);
        } else {
          // Si el usuario no está autenticado, redirige a la página de inicio de sesión
          navigate('/login');
        }
      } catch (error) {
        console.error("Error al obtener información del carrito de compras:", error);
      }
    };

    checkUser();
  }, [currentUser, navigate]);

  // Función para calcular el total del carrito
  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
  };

  // Función para quitar un producto del carrito
  const quitarDelCarrito = async (productoId) => {
    try {
      // Lógica para quitar el producto del carrito
      // Puedes utilizar el servicio correspondiente para realizar esta acción
      await carritosService.quitarDelCarrito(currentUser.id, productoId);

      // Actualizar la lista de productos en el carrito
      const response = await carritosService.obtenerProductosEnCarrito(currentUser.id);
      const productosEnCarrito = response.data.productosEnCarrito;
      setCarrito(productosEnCarrito);
    } catch (error) {
      console.error("Error al quitar el producto del carrito:", error);
    }
  };

  return (
    <>
      <Navbar />

      <section className="page">
        <div className="container">
          <h2 className="mb-4">Carrito de Compras</h2>

          {carrito.length !== 0 ? (
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
                              className="btn btn-danger"
                              onClick={() => quitarDelCarrito(producto.id)}
                            >
                              Quitar del Carrito
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

              <div className="row mt-3">
                <div className="col">
                  <button className="btn btn-primary">
                    Ir a Pagar
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
