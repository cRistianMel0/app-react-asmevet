/* eslint-disable react/prop-types */
import { useState } from 'react';
import { PencilSquare, ExclamationTriangle } from 'react-bootstrap-icons';
import "../styled-components/cardServicios.scss";
import servicioImg from '../../../assets/img/servicio.jpeg';
import axios from 'axios';
import ServiciosEdit from '../ServiciosEdit';


export default function CardServicios({ cards }) {
  const [editModalShow, setEditModalShow] = useState(false);
  const [editedServicio, setEditedServicio] = useState(null);

  const handleEdit = (servicio) => {
      console.log(servicio)
    const servicioKey = servicio.id;

    setEditedServicio({
      ...editedServicio,
      [servicioKey]: { 
        nombre: servicio.nombre,
        descripcion: servicio.descripcion,
        imagen: servicio.imagen,
      }
    });
    setEditModalShow(true);
  }

  const handleSaveEdit = (editedServicio) => {
    setEditModalShow(false);
    console.log(editedServicio);
  }

  const handleDelete = (idServicio) => {
    let res = window.confirm("¿Está seguro de que desea DESHABILITAR el servicio?");
    if (res) {
      axios.patch('http://localhost:8000/servicios', {idServicio})
        .then(response => {
          console.log(response.data);
          window.location.reload();
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
                <ExclamationTriangle />
              </button>
            </div>
          </div>
        </div>
      ))}
      {editedServicio && (
        <ServiciosEdit
          show={editModalShow}
          onClose={() => setEditModalShow(false)}
          servicio={editedServicio}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
}
