/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function VeterinariosEdit({
  show,
  onClose,
  veterinario,
  onSave,
}) {
  const [editedVeterinario, setEditedVeterinario] = useState({
    id: veterinario.id,
    username: veterinario.username,
    email: veterinario.email,
  });

  useEffect(() => {
    setEditedVeterinario({
      id: veterinario.id,
      username: veterinario.username,
      email: veterinario.email,
    });
  }, [veterinario]);

  const handleSave = () => {
    onSave(editedVeterinario);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Veterinario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre del Veterinario</Form.Label>
            <Form.Control
              type="text"
              value={editedVeterinario.username}
              onChange={(e) =>
                setEditedVeterinario({
                  ...editedVeterinario,
                  username: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email del Veterinario</Form.Label>
            <Form.Control
              type="email"
              value={editedVeterinario.email}
              onChange={(e) =>
                setEditedVeterinario({
                  ...editedVeterinario,
                  email: e.target.value,
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
