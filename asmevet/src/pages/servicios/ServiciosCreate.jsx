import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Plus } from 'react-bootstrap-icons';
import axios from 'axios';

export default function ServiciosCreate() {
  // Estado para controlar la visibilidad del modal
  const [show, setShow] = useState(false);

  // Estado para almacenar los valores del formulario
  const [formValues, setFormValues] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
  });

  // Estado para manejar la validación del formulario
  const [validated, setValidated] = useState(false);

  // Función para cerrar el modal, limpiar el formulario y recargar la page
  const handleClose = () => {
    setShow(false);
    setFormValues({
      nombre: '',
      descripcion: '',
      imagen: '',
    });
    setValidated(false);
    window.location.reload();
  };

  // Función para mostrar el modal
  const handleShow = () => setShow(true);

  // Función para manejar el envío del formulario
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    // Validar el formulario
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        // Realizar una solicitud POST a la API con los valores del formulario
        await axios.post("http://localhost:8000/servicios", formValues);
        // Cerrar el modal después de enviar los datos
        handleClose();
      } catch (err) {
        console.log(err);
      }
    }
    setValidated(true);
  };

  // Función para manejar los cambios en los campos del formulario
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
                type="file" // Cambiado a type "file" para cargar imágenes
                name="imagen"
                value={formValues.imagen}
                onChange={handleInputChange}
              />
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
