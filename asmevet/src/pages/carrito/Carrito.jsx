import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import authService from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
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
          console.log(currentUser.id)
          const fetchAllProductos = async () => {
            try {
              const response = await carritosService.obtenerProductosEnCarrito(currentUser.id);

              const res = response.data.productosEnCarrito;
              // Filtrar los productos disponibles (donde el campo "disponible" es igual a 1)
              const productosDisponibles = res.data.filter(producto => producto.enCarrito === true);
              console.log(productosData)
              setProductos(productosDisponibles); //Uso de la funcion para poder ver los productos disponibles
            } catch (err) {
              console.log(err);
            }
          }
          fetchAllProductos()
        } else {
          // Si el usuario no está autenticado
          navigate('/unauthorized');
        }
      } catch (error) {
        console.error("Error al obtener información del carrito de compras:", error);
      }
    };

    checkUser();
  }, [navigate]);

  const filteredProductos = productosData.filter((servicio) =>
    servicio.nombre.toLowerCase().includes(searchText.toLowerCase())
  );


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

                      <div className="row d-flex gap-5 justify-content-center mt-5">
                        <CardProductos cards={filteredProductos} />
                      </div>
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
