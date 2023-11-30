import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { PlusCircle  } from 'react-bootstrap-icons';

export default function ProductosCreate() {
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

  // Función para cerrar el modal y limpiar el formulario
  const handleClose = () => {
    setShow(false);
    setFormValues({
      nombre: '',
      descripcion: '',
      imagen: '',
    });
    setValidated(false);
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
        await productosService.create(formValues); // Utilizar el método create del producto
        // Cerrar el modal y recargar la página después de enviar los datos
        handleClose();
        window.location.reload();
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
        <PlusCircle /> Agrega un Nuevo Producto
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Producto</Modal.Title>
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
                type="file"
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
                Agregar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
