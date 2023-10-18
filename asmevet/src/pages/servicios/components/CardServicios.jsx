/* eslint-disable react/prop-types */
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import "../styled-components/cardServicios.scss";
import servicioImg from '../../../assets/img/servicio.jpeg';

export default function CardServicios({ cards }) {
  const handleEdit = (servicio) => {
    console.log(servicio.nombre);
  }

  const handleDelete = (servicio) => {
    let res = confirm("¿Está seguro de que desea DESHABIILITAR el servicio?");
    if (res) {
      console.log(servicio.nombre)
    } 
  }

  return (
    <>
      {cards.map((servicio, index) => (
        <div className="card" key={index}>
          <div className="card-image" style={{backgroundImage: `url(${servicioImg})`}}></div>
          <div className="heading">
            {servicio.nombre}
            <div className="description">
              {servicio.descripcion}
            </div>
            <div className="buttons">
              <button className="edit-button" onClick={() => handleEdit(servicio)}>
                <PencilSquare />
              </button>
              <button className="delete-button" onClick={() => handleDelete(servicio)}>
                <Trash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
