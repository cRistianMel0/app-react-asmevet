/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function clientesEdit({
  show,
  onClose,
  cliente,
  onSave,
}) {
  const [editedCliente, setEditedCliente] = useState({
    id: cliente.id,
    username: cliente.nombre,
    email: cliente.email,
    tipoDoc: cliente.tipoDoc,
    documento: cliente.documento,
    telefono: cliente.telefono,
    direccion: cliente.direccion,
    genero: cliente.genero,
    fechaNacimiento: cliente.fechaNacimiento,
  });

  useEffect(() => {
    setEditedCliente({
      id: cliente.id,
      username: cliente.username,
      email: cliente.email,
      tipoDoc: cliente.tipoDoc,
      documento: cliente.documento,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      genero: cliente.genero,
      fechaNacimiento: formatDateForInput(cliente.fechaNacimiento)
    });
  }, [cliente]);


  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  const handleSave = () => {
    onSave(editedCliente);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre del cliente</Form.Label>
            <Form.Control
              type="text"
              value={editedCliente.username}
              onChange={(e) =>
                setEditedCliente({
                  ...editedCliente,
                  username: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email del cliente</Form.Label>
            <Form.Control
              type="email"
              value={editedCliente.email}
              onChange={(e) =>
                setEditedCliente({
                  ...editedCliente,
                  email: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tipo de Documento</Form.Label>
            <Form.Control
              as="select"
              value={editedCliente.tipoDoc}
              onChange={(e) =>
                setEditedCliente({
                  ...editedCliente,
                  tipoDoc: e.target.value,
                })
              }
            >
              <option value="DNI">DNI</option>
              <option value="C.C">C.C</option>
              <option value="T.I">T.I</option>
              <option value="Pasaporte">Pasaporte</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Número de Documento</Form.Label>
            <Form.Control
              type="text"
              value={editedCliente.documento}
              onChange={(e) =>
                setEditedCliente({
                  ...editedCliente,
                  documento: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              value={editedCliente.telefono}
              onChange={(e) =>
                setEditedCliente({
                  ...editedCliente,
                  telefono: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              value={editedCliente.direccion}
              onChange={(e) =>
                setEditedCliente({
                  ...editedCliente,
                  direccion: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Género</Form.Label>
            <Form.Control
              as="select"
              value={editedCliente.genero}
              onChange={(e) =>
                setEditedCliente({
                  ...editedCliente,
                  genero: e.target.value,
                })
              }
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              value={editedCliente.fechaNacimiento}
              onChange={(e) =>
                setEditedCliente({
                  ...editedCliente,
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
