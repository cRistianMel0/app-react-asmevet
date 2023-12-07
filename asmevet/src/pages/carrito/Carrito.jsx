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

          const { data } = response;

          if (data.productosEnCarrito && data.productosEnCarrito.length > 0) {
            const productosEnCarrito = data.productosEnCarrito;
            setCarrito(productosEnCarrito);
          } else {
            // Si el usuario tiene un carrito vacío, recarga la página
            window.location.reload();
          }
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
  // Función para calcular el total del carrito
  const calcularTotal = () => {
    const total = carrito.reduce((acc, producto) => {
      const precio = parseFloat(producto.precio);
      return acc + (isNaN(precio) ? 0 : precio);
    }, 0);

    return total.toFixed(2); // Redondear el total a 2 decimales
  };

  const handleDelete = async (userId, productId) => {
    console.log("UserId:", userId);
    console.log("ProductId:", productId);
    try {
      // Realizar la solicitud para quitar el producto del carrito
      await carritosService.quitarDelCarrito(userId, productId);
      window.location.reload();

    } catch (error) {
      console.error("Error al quitar producto del carrito:", error);
    }
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
                              className="btn btn-danger"
                              onClick={() => handleDelete(currentUser.id, producto.idProducto)}
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
