/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function ClientesEdit({ show, onClose, cliente, onSave }) {
  const [editedCliente, setEditedCliente] = useState({
    id: cliente.id,
    username: cliente.username,
    email: cliente.email,
  });

  useEffect(() => {
    setEditedCliente({
      id: cliente.id,
      username: cliente.username,
      email: cliente.email,
    });
  }, [cliente]);

  const handleSave = () => {
    onSave(editedCliente);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre del Cliente</Form.Label>
            <Form.Control
              type="text"
              value={editedCliente.username}
              onChange={(e) =>
                setEditedCliente({ ...editedCliente, username: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email del Cliente</Form.Label>
            <Form.Control
              type="email"
              value={editedCliente.email}
              onChange={(e) =>
                setEditedCliente({ ...editedCliente, email: e.target.value })
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
