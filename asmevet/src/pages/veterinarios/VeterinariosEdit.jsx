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
    username: veterinario.nombre,
    email: veterinario.email,
    tipoDoc: veterinario.tipoDoc,
    documento: veterinario.documento,
    telefono: veterinario.telefono,
    direccion: veterinario.direccion,
    genero: veterinario.genero,
    fechaNacimiento: veterinario.fechaNacimiento,
  });

  useEffect(() => {
    setEditedVeterinario({
      id: veterinario.id,
      username: veterinario.username,
      email: veterinario.email,
      tipoDoc: veterinario.tipoDoc,
      documento: veterinario.documento,
      telefono: veterinario.telefono,
      direccion: veterinario.direccion,
      genero: veterinario.genero,
      fechaNacimiento: formatDateForInput(veterinario.fechaNacimiento)
    });
  }, [veterinario]);


  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

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
          <Form.Group>
            <Form.Label>Tipo de Documento</Form.Label>
            <Form.Control
              as="select"
              value={editedVeterinario.tipoDoc}
              onChange={(e) =>
                setEditedVeterinario({
                  ...editedVeterinario,
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
              value={editedVeterinario.documento}
              onChange={(e) =>
                setEditedVeterinario({
                  ...editedVeterinario,
                  documento: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              value={editedVeterinario.telefono}
              onChange={(e) =>
                setEditedVeterinario({
                  ...editedVeterinario,
                  telefono: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              value={editedVeterinario.direccion}
              onChange={(e) =>
                setEditedVeterinario({
                  ...editedVeterinario,
                  direccion: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Género</Form.Label>
            <Form.Control
              as="select"
              value={editedVeterinario.genero}
              onChange={(e) =>
                setEditedVeterinario({
                  ...editedVeterinario,
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
              value={editedVeterinario.fechaNacimiento}
              onChange={(e) =>
                setEditedVeterinario({
                  ...editedVeterinario,
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
