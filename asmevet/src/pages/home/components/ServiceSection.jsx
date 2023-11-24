import { Container, Row, Col } from 'react-bootstrap';
import '../styled-components/serviceSection.scss';
import servicioImg1 from '../../../assets/img/s-1.png';
import servicioImg2 from '../../../assets/img/s-2.png';
import servicioImg3 from '../../../assets/img/s-3.png';
import toolImg from '../../../assets/img/slider-img3.png';
import { Link } from 'react-router-dom';

const ServiceSection = () => {
  return (
    <section className="service_section">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={6} offset-md={2}>
            <h2 className="custom_heading">
              Nuestros Servicios
            </h2>
            <Container className="layout_padding2">
              <Row>
                <Col md={4} className="col">
                  <div className="img_box">
                    <img src={servicioImg1} alt="Servicio de Cuidado para Mascotas" />
                  </div>
                  <div className="detail_box">
                    <h6>Cuidado de Mascotas</h6>
                    <p>
                      Brindamos atención especializada para el cuidado de tu mascota,
                      garantizando su bienestar y felicidad. ¡Confía en nosotros para el
                      cuidado de tus amigos peludos!
                    </p>
                  </div>
                </Col>
                <Col md={4} className="col">
                  <div className="img_box">
                    <img src={servicioImg2} alt="Servicio de Hotel para Mascotas" />
                  </div>
                  <div className="detail_box">
                    <h6>Hotel para Mascotas</h6>
                    <p>
                      Ofrecemos un lugar seguro y cómodo para que tus mascotas se relajen
                      y se diviertan mientras estás fuera. Nuestro hotel es su hogar lejos
                      de casa.
                    </p>
                  </div>
                </Col>
                <Col md={4} className="col">
                  <div className="img_box">
                    <img src={servicioImg3} alt="Servicio de Emergencia Veterinaria" />
                  </div>
                  <div className="detail_box">
                    <h6>Emergencias</h6>
                    <p>
                      Estamos disponibles las 24 horas para atender emergencias veterinarias.
                      Nuestro equipo altamente capacitado está listo para proporcionar la
                      atención necesaria en momentos críticos.
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
            <Link to="/servicios" className='linkService'>
              Conoce Más
            </Link>
          </Col>
          <Col md={4}>
            <img src={toolImg} alt="Herramientas Veterinarias" className="w-100" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServiceSection;
