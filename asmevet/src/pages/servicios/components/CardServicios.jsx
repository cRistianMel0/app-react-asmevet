import "../styled-components/cardServicios.scss";
import servicioImg from '../../../assets/img/servicio.jpeg'

export default function CardServicios({ cards }) {
  return (
    <>
      {cards.map((servicio) => (
        <div class="card">
          <div class="card-image" style={{backgroundImage: `url(${servicioImg})`}}></div>
          <div class="heading">
            {servicio.nombre}
            <div class="description">
              {servicio.descripcion}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
