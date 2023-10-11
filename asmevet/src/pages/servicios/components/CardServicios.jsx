import "../styled-components/cardServicios.scss";

export default function CardServicios({ cards }) {
  return (
    <>
      {cards.map((servicio) => (
        <div class="card">
          <div class="card-image" style={{backgroundImage: `url(${servicio.imagen})`}}></div>
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
