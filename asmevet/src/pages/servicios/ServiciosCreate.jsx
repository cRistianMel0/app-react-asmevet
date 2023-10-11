import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Plus } from 'react-bootstrap-icons';

export default function ServiciosCreate() {
  const [show, setShow] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
  });

  const [validated, setValidated] = useState(false);

  const handleClose = () => {
    setShow(false);
    setFormValues({
      nombre: '',
      descripcion: '',
      imagen: '',
    });
    setValidated(false);
  };

  const handleShow = () => setShow(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // Handle form submission and API call
      // You can add your POST request here
      console.log(formValues);
      handleClose();
    }

    setValidated(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>
        <Plus /> Agrega un Nuevo Servicio
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formValues.nombre}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Este campo es obligatorio.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={formValues.descripcion}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Este campo es obligatorio.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={formValues.imagen}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Este campo es obligatorio.
              </Form.Control.Feedback>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
