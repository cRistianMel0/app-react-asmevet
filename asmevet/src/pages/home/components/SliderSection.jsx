import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import '../styled-components/SliderSection.scss';
import sliderImg1 from '../../../assets/img/slider-img1.png';
import sliderImg2 from '../../../assets/img/slider-img2.png';
import sliderImg3 from '../../../assets/img/slider-img3.png';
import sliderImg4 from '../../../assets/img/slider-img4.jpeg';
import sliderImg5 from '../../../assets/img/slider-img5.jpeg';
import sliderImg6 from '../../../assets/img/slider-img6.jpeg';
import { Link } from 'react-router-dom';

const SliderSection = () => {
  return (
    <section className="slider_section position-relative">
      <Carousel>
        {/* Slide 1 */}
        <Carousel.Item>
          <Container fluid className="slide-container">
            <Row className="justify-content-center align-items-center">
              <Col md={6}>
                <div className="slider_detail-box">
                  <h1>
                    Cuidado Profesional para tu Mascota
                  </h1>
                  <p>
                    Ofrecemos servicios de cuidado de mascotas con un enfoque
                    profesional y dedicado. Tu amigo peludo merece lo mejor.
                  </p>
                  <div className="btn-box">
                    <Link to="/servicios" className='linkService'>
                      Conoce Más
                    </Link>
                    <Button href="#mapa" className="btn-custom-2">
                      Ubicación
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="slider_img-box">
                  <img src={sliderImg1} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <Container fluid className="slide-container">
            <Row className="justify-content-center align-items-center">
              <Col md={6}>
                <div className="slider_detail-box">
                  <h1>
                    Veterinarios Altamente Calificados
                  </h1>
                  <p>
                    Nuestro equipo de veterinarios está compuesto por
                    profesionales altamente calificados y amantes de los
                    animales. Tu mascota está en buenas manos.
                  </p>
                  <div className="btn-box">
                    <Button href="#" className="btn-custom-1">
                      Conoce al Equipo
                    </Button>
                    <Button href="#mapa" className="btn-custom-2">
                      Ubicación
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="slider_img-box">
                  <img src={sliderImg2} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <Container fluid className="slide-container">
            <Row className="justify-content-center align-items-center">
              <Col md={6}>
                <div className="slider_detail-box">
                  <h1>
                    Servicios Completos para Mascotas
                  </h1>
                  <p>
                    Ofrecemos una amplia gama de servicios para garantizar la
                    salud y felicidad de tu mascota. Desde chequeos regulares
                    hasta tratamientos especializados.
                  </p>
                  <div className="btn-box">
                    <Link to="/servicios" className='linkService'>
                      Ver Servicios
                    </Link>
                    <Button href="#mapa" className="btn-custom-2">
                      Ubicación
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="slider_img-box">
                  <img src={sliderImg3} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>

        {/* Slide 4 */}
        <Carousel.Item>
          <Container fluid className="slide-container">
            <Row className="justify-content-center align-items-center">
              <Col md={6}>
                <div className="slider_detail-box">
                  <h1>
                    Urgencias Veterinarias las 24 Horas
                  </h1>
                  <p>
                    Estamos disponibles las 24 horas para atender cualquier
                    emergencia veterinaria. La salud de tu mascota es nuestra
                    prioridad.
                  </p>
                  <div className="btn-box">
                    <Button href="#" className="btn-custom-1">
                      Contactar Ahora
                    </Button>
                    <Button href="#mapa" className="btn-custom-2">
                      Ubicación
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="slider_img-box">
                  <img src={sliderImg4} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>

        {/* Slide 5 */}
        <Carousel.Item>
          <Container fluid className="slide-container">
            <Row className="justify-content-center align-items-center">
              <Col md={6}>
                <div className="slider_detail-box">
                  <h1>
                    Programas de Prevención y Bienestar
                  </h1>
                  <p>
                    Ofrecemos programas de prevención y bienestar para mantener
                    a tu mascota sana y feliz a lo largo de toda su vida. Tu
                    compañero merece lo mejor.
                  </p>
                  <div className="btn-box">
                    <Link to="/servicios" className='linkService'>
                      Conoce Más
                    </Link>
                    <Button href="#mapa" className="btn-custom-2">
                      Ubicación
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="slider_img-box">
                  <img src={sliderImg5} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>

        {/* Slide 6 */}
        <Carousel.Item>
          <Container fluid className="slide-container">
            <Row className="justify-content-center align-items-center">
              <Col md={6}>
                <div className="slider_detail-box">
                  <h1>
                    Productos de Calidad para tu Mascota
                  </h1>
                  <p>
                    Descubre nuestra amplia variedad de productos de alta
                    calidad para el cuidado y bienestar de tu mascota. Desde
                    alimentos hasta juguetes, tenemos todo lo que necesitas.
                  </p>
                  <div className="btn-box">
                    <Button href="#" className="btn-custom-1">
                      Ver Productos
                    </Button>
                    <Button href="#mapa" className="btn-custom-2">
                      Ubicación
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="slider_img-box">
                  <img src={sliderImg6} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default SliderSection;
