import '../../styled-components/styles.scss';
import Navbar from "../../components/Navbar";
import CardServicios from './components/CardServicios';
import serviciosImg from '../../assets/img/pet.svg';
import servicioImg from '../../assets/img/servicio.jpeg'
import ServiciosCreate from './ServiciosCreate';

export default function Servicios() {
    const serviciosData = [
        {
          idServicio: '1',
          nombre: 'Consulta General',
          descripcion: 'Realizamos consultas generales para revisar la salud de tu mascota y proporcionar recomendaciones de cuidado.',
          imagen: servicioImg,
        },
        {
          idServicio: '2',
          nombre: 'Ortopedia y Traumatología',
          descripcion: 'Ofrecemos servicios de ortopedia y traumatología para tratar lesiones y problemas en los huesos y articulaciones de tu mascota.',
          imagen: servicioImg,
        },
        {
          idServicio: '3',
          nombre: 'Cirugía General',
          descripcion: 'Realizamos cirugías generales para tratar una variedad de condiciones médicas en animales de compañía.',
          imagen: servicioImg,
        },
        {
          idServicio: '4',
          nombre: 'Laboratorio Clínico',
          descripcion: 'Nuestro laboratorio clínico ofrece pruebas de diagnóstico para evaluar la salud de tu mascota y detectar enfermedades.',
          imagen: servicioImg,
        },
        {
          idServicio: '5',
          nombre: 'Hospitalización',
          descripcion: 'Contamos con instalaciones de hospitalización para cuidar a los pacientes que requieren atención continua y tratamiento.',
          imagen: servicioImg,
        },
        {
          idServicio: '6',
          nombre: 'Ecografía',
          descripcion: 'Realizamos ecografías para obtener imágenes detalladas del interior del cuerpo de tu mascota y ayudar en diagnósticos.',
          imagen: servicioImg,
        },
        {
          idServicio: '7',
          nombre: 'Radiografía',
          descripcion: 'Ofrecemos servicios de radiografía para obtener imágenes de rayos X que ayudan en el diagnóstico de problemas de salud.',
          imagen: servicioImg,
        },
        {
          idServicio: '8',
          nombre: 'Limpieza',
          descripcion: 'Proporcionamos servicios de limpieza dental y cuidado bucal para mantener la salud oral de tu mascota.',
          imagen: servicioImg,
        },
        {
          idServicio: '9',
          nombre: 'Endoscopia',
          descripcion: 'Realizamos endoscopias para examinar el interior de los órganos y ayudar en el diagnóstico y tratamiento de enfermedades.',
          imagen: servicioImg,
        },
        {
          idServicio: '10',
          nombre: 'Neurología',
          descripcion: 'Ofrecemos servicios de neurología para diagnosticar y tratar trastornos neurológicos en animales de compañía.',
          imagen: servicioImg,
        },
        {
          idServicio: '11',
          nombre: 'Histopatología',
          descripcion: 'Realizamos estudios de histopatología para examinar muestras de tejido y ayudar en el diagnóstico de enfermedades.',
          imagen: servicioImg,
        },
    ];      

    return (
        <>
            <Navbar />

            <section className="page">
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-7">
                        <h2 className='mb-4'>SERVICIOS</h2>
                            <p>
                                En Asmevet, ofrecemos una amplia gama de servicios veterinarios de alta calidad para cuidar la salud y el bienestar de tus queridas mascotas. <br /> <br /> Nuestros servicios están diseñados para garantizar que tus mascotas reciban la atención que se merecen. <br /> <br /> Desde consultas generales hasta tratamientos especializados, estamos aquí para ayudarte a mantener a tus amigos peludos felices y saludables.
                            </p>
                        </div>
                        <div className="col">
                            <img className='img-fluid rounded-circle' src={serviciosImg} alt="Imagen de un gato"/>
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
