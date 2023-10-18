import React, { useState } from 'react';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import "../styled-components/cardServicios.scss";
import servicioImg from '../../../assets/img/servicio.jpeg';
import ServiciosEdit from '../ServiciosEdit';

export default function CardServicios({ cards }) {
  const [editModalShow, setEditModalShow] = useState(false);
  const [editedServicio, setEditedServicio] = useState(null);

  const handleEdit = (servicio) => {
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
  }

  const handleDelete = (servicio) => {
    let res = confirm("¿Está seguro de que desea ELIMINAR el servicio?");
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
