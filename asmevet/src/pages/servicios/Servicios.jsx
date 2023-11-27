import '../../styled-components/styles.scss';
import Navbar from "../../components/Navbar";
import CardServicios from './components/CardServicios';
import serviciosImg from '../../assets/img/pet.svg';
import ServiciosCreate from './ServiciosCreate';
import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import serviciosService from '../../services/servicios.service';
import Whatsapp from '../../components/Whatsapp';

export default function Servicios() {
  const [serviciosData, setServicios] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Llamado al API para traer los registros de servicios
  useEffect(() => {
    const fetchAllServicios = async () => {
      try {
        const res = await serviciosService.findAll();
        // Filtrar los servicios disponibles (donde el campo "disponible" es igual a 1)
        const serviciosDisponibles = res.data.filter(servicio => servicio.disponible === true);
        console.log(serviciosData)
        setServicios(serviciosDisponibles);
      } catch (err) {
        console.log(err);
      }
    }
  
    fetchAllServicios()
  }, [])
  

  // Función para filtrar los servicios en función del texto de búsqueda
  const filteredServicios = serviciosData.filter((servicio) =>
    servicio.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <Whatsapp />

      <section className="page">
        <div className="container">
          <div className="row mb-4">
            <div className="col-7">
              <h2 className='mb-4'>SERVICIOS</h2>
              <p>
                En Asmevet, ofrecemos una amplia gama de servicios veterinarios de alta calidad para cuidar la salud y el bienestar de tus queridas mascotas. <br /> <br /> Nuestros servicios están diseñados para garantizar que tus mascotas reciban la atención que se merecen. <br /> <br /> Desde consultas generales hasta tratamientos especializados, estamos aquí para ayudarte a mantener a tus amigos peludos felices y saludables.
              </p>
            </div>
            <div className="col">
              <img className='img-fluid rounded-circle' src={serviciosImg} alt="Imagen de un gato" />
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <SearchBar searchText={searchText} setSearchText={setSearchText} />
            </div>
            <div className="col-4">
              <ServiciosCreate />
            </div>
          </div>
          <div className="row d-flex gap-5 justify-content-center mt-5">
            <CardServicios cards={filteredServicios} />
          </div>
        </div>
      </section>
    </>
  )
}
