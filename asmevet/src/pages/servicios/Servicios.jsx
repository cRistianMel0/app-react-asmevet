import '../../styled-components/styles.scss';
import Navbar from "../../components/Navbar";
import CardServicios from './components/CardServicios';
import serviciosImg from '../../assets/img/pet.svg';
import ServiciosCreate from './ServiciosCreate';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Servicios() {
  const [serviciosData, setServicios] = useState([])

  // Llamado al API para traer los registros de servicios
  useEffect(() => {
    const fetchAllServicios = async () => {
      try {
        const res = await axios.get("http://localhost:8000/servicios")
        setServicios(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAllServicios()
  }, [])

  return (
    <>
      <Navbar />

      <section className="page">
        <div className="container">
          <div className="row mb-3">
            <div className="col-7">
              <h2 className='mb-4'>Servicios</h2>
              <p>
                En Asmevet, ofrecemos una amplia gama de servicios veterinarios de alta calidad para cuidar la salud y el bienestar de tus queridas mascotas. <br /> <br /> Nuestros servicios están diseñados para garantizar que tus mascotas reciban la atención que se merecen. <br /> <br /> Desde consultas generales hasta tratamientos especializados, estamos aquí para ayudarte a mantener a tus amigos peludos felices y saludables.
              </p>
            </div>
            <div className="col">
              <img className='img-fluid rounded-circle' src={serviciosImg} alt="Imagen de un gato" />
            </div>
          </div>
          <ServiciosCreate />
          <div className="row d-flex gap-5 justify-content-center mt-5">
            <CardServicios cards={serviciosData} />
          </div>
        </div>
      </section>
    </>
  )
}
