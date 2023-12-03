/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function ServiciosEdit({ show, onClose, servicio, onSave }) {
  const [editedServicio, setEditedServicio] = useState({ 
    idServicio: servicio.idServicio,
    nombre: servicio.nombre,
    descripcion: servicio.descripcion,
    imagen: servicio.imagen,
  });

  useEffect(() => {
    setEditedServicio({ 
      idServicio: servicio.idServicio,
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      imagen: servicio.imagen,
    });
  }, [servicio]);

  const handleSave = () => {
    onSave(editedServicio); 
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre del Servicio</Form.Label>
            <Form.Control
              type="text"
              value={editedServicio.nombre}
              onChange={(e) =>
                setEditedServicio({ ...editedServicio, nombre: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción del Servicio</Form.Label>
            <Form.Control
              as="textarea"
              value={editedServicio.descripcion}
              onChange={(e) =>
                setEditedServicio({
                  ...editedServicio,
                  descripcion: e.target.value,
                })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
