import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import SearchBar from "../../components/SearchBar";
import Whatsapp from "../../components/Whatsapp";
import authService from "../../services/auth.service";
import productosImg from '../../assets/img/slider-img6.jpeg';
import ProductosCreate from "./ProductosCreate";
import CardProductos from "./components/CardProductos";
import productosService from "../../services/productos.service";

export default function Productos() {
  window.scrollTo(0, 0);
  
  const [productosData, setProductos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const currentUser = authService.getCurrentUser();

  // Llamado al API para traer los registros de productos
  useEffect(() => {
    const fetchAllProductos = async () => {
      try {
        const res = await productosService.findAll();
        // Filtrar los productos disponibles (donde el campo "disponible" es igual a 1)
        const productosDisponibles = res.data.filter(servicio => servicio.disponible === true);
        console.log(productosData)
        setProductos(productosDisponibles); //Uso de la funcion para poder ver los productos disponibles
      } catch (err) {
        console.log(err);
      }
    }
  
    fetchAllProductos()
  }, [])
  
  // Función para filtrar los productos en función del texto de búsqueda
  const filteredProductos = productosData.filter((servicio) =>
    servicio.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <Whatsapp />

      <section className="page">
        <div className="container">
          <div className="row mb-4 align-items-center">
            <div className="col">
              <img className='img-fluid' src={productosImg} alt="Imagen de productos para mascotas" />
            </div>
            <div className="col-5">
              <h2 className='mb-4'>PRODUCTOS</h2>
              <p>
                Descubre nuestra selección de productos de alta calidad para el cuidado y bienestar de tus mascotas en Asmevet. 
                <br /> <br />
                Desde alimentos premium hasta juguetes y accesorios, ofrecemos todo lo que necesitas para mantener a tus amigos peludos felices y saludables. 
                <br /> <br />
                Visita nuestra tienda y encuentra los mejores productos para el cuidado de tus mascotas.
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-8">
              <SearchBar searchText={searchText} setSearchText={setSearchText} />
            </div>
            {currentUser && currentUser.roles && currentUser.roles.includes("ROLE_ADMIN") && (
              <div className="col-4">
                <ProductosCreate />
              </div>
            )}
          </div>

          <div className="row d-flex gap-5 justify-content-center mt-5">
            <CardProductos cards={filteredProductos} />
          </div>
        </div>
      </section>
    </>
  );
}
