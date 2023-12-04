/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function AnimalesEdit({ show, onClose, animal, onSave }) {
  const [editedAnimal, setEditedAnimal] = useState({
    idAnimal: animal.idAnimal,
    idUser: animal.idUser,
    nombre: animal.nombre,
    tipo: animal.tipo,
    raza: animal.raza,
    collar: animal.collar,
    requiereCarnet: animal.requiereCarnet,
    fechaNacimiento: new Date(animal.fechaNacimiento)
      .toISOString()
      .substr(0, 10),
  });

  useEffect(() => {
    setEditedAnimal({
      idAnimal: animal.idAnimal,
      idUser: animal.idUser,
      nombre: animal.nombre,
      tipo: animal.tipo,
      raza: animal.raza,
      collar: animal.collar,
      requiereCarnet: animal.requiereCarnet,
      fechaNacimiento: new Date(animal.fechaNacimiento)
        .toISOString()
        .substr(0, 10),
    });
  }, [animal]);

  const handleSave = () => {
    onSave(editedAnimal);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Animal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre del Animal</Form.Label>
            <Form.Control
              type="text"
              value={editedAnimal.nombre}
              onChange={(e) =>
                setEditedAnimal({
                  ...editedAnimal,
                  nombre: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="text"
              value={editedAnimal.tipo}
              onChange={(e) =>
                setEditedAnimal({
                  ...editedAnimal,
                  tipo: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Raza</Form.Label>
            <Form.Control
              type="text"
              value={editedAnimal.raza}
              onChange={(e) =>
                setEditedAnimal({
                  ...editedAnimal,
                  raza: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              value={editedAnimal.fechaNacimiento}
              onChange={(e) =>
                setEditedAnimal({
                  ...editedAnimal,
                  fechaNacimiento: e.target.value,
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
