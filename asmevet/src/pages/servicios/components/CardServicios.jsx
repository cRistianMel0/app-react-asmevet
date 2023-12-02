/* eslint-disable react/prop-types */

import { useState } from 'react';
import { PencilSquare, ExclamationTriangle } from 'react-bootstrap-icons';
import "../styled-components/cardServicios.scss";
import servicioImg from '../../../assets/img/servicio.jpeg';
import ServiciosEdit from '../ServiciosEdit';
import serviciosService from '../../../services/servicios.service';
import authService from '../../../services/auth.service';

export default function CardServicios({ cards }) {
  const [editModalShow, setEditModalShow] = useState(false);
  const [editedServicio, setEditedServicio] = useState(null);
  const currentUser = authService.getCurrentUser();

  const handleEdit = (servicio) => {
    setEditedServicio(servicio); 
    setEditModalShow(true);
  }
  
  const handleSaveEdit = (editedServicio) => {
    serviciosService.update(editedServicio)
      .then(response => {
        console.log(response.data);
        setEditModalShow(false);
        alert('¡El servicio se actualizó correctamente!');
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
        window.alert(`Se ha generado un problema en el servidor ${error}`);
      });
  };
  
  

  const handleDelete = (servicio) => {
    let res = window.confirm("¿Está seguro de que desea DESHABILITAR el servicio?");
    if (res) {
      serviciosService.updateDisponibilidad(servicio) 
        .then(response => {
          console.log(response.data);
          window.location.reload();
        })
        .catch(error => {
          console.error(error);
          window.alert(`Se ha generado un problema en el servidor ${error}`);
        });
    }
  }
  

  return (
    <>
      {cards.map((servicio, index) => (
        <div className="card" key={index}>
          <div className="card-image" style={{ backgroundImage: `url(${servicioImg})` }}></div>
          <div className="heading">
            {servicio.nombre}
            <div className="description">
              {servicio.descripcion}
            </div>
            {currentUser && currentUser.roles && currentUser.roles.includes("ROLE_ADMIN") && (
            <div className="buttons">
              <button className="edit-button" onClick={() => handleEdit(servicio)}>
                <PencilSquare />
              </button>
              <button className="disable-button" onClick={() => handleDelete(servicio)}>
                <ExclamationTriangle />
              </button>
            </div>
            )}
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
