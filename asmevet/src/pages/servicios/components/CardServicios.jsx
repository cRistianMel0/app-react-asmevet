/* eslint-disable react/prop-types */
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import "../styled-components/cardServicios.scss";
import servicioImg from '../../../assets/img/servicio.jpeg';
import axios from 'axios';

export default function CardServicios({ cards }) {
  const handleEdit = (servicio) => {
      console.log(servicio)
  }

  const handleDelete = (idServicio) => {
    let res = window.confirm("¿Está seguro de que desea DESHABILITAR el servicio?");
    if (res) {
      axios.patch('http://localhost:8000/servicios', {idServicio})
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
          // Manejar el error si es necesario
          window.alert(`Se ha generado un problema en el servidor ${error}`)
        });
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
              <button className="delete-button"  onClick={() => handleDelete(servicio.idServicio)}>
                <Trash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
