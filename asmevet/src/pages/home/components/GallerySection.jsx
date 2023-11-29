import { Container } from "react-bootstrap";
import "../styled-components/gallerySection.scss";
import galleryImg1 from '../../../assets/img/galeria-img1.jpg';
import galleryImg2 from '../../../assets/img/galeria-img2.jpg';
import galleryImg3 from '../../../assets/img/galeria-img3.jpg';
import galleryImg4 from '../../../assets/img/galeria-img4.jpg';
import galleryImg5 from '../../../assets/img/galeria-img5.jpg';

const GallerySection = () => {
  return (
    <section className="gallery-section layout_padding">
      <Container>
        <h2>Nuestra Galería</h2>
      </Container>
      <Container className="gallery-container">
        <div className="img_box box-1">
          <img src={galleryImg1} alt="" />
        </div>
        <div className="img_box box-2">
          <img src={galleryImg2} alt="" />
        </div>
        <div className="img_box box-3">
          <img src={galleryImg3} alt="" />
        </div>
        <div className="img_box box-4">
          <img src={galleryImg4} alt="" />
        </div>
        <div className="img_box box-5">
          <img src={galleryImg5} alt="" />
        </div>
      </Container>
    </section>
  );
};

export default GallerySection;
