import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { PlusCircle } from 'react-bootstrap-icons';
import productosService from '../../services/productos.service'; // Importa el servicio de productos

export default function ProductosCreate() {
  const [show, setShow] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: '',
    descripcion: '',
    imagen: null,
    precio: '', // Cambia el estado para el campo de precio
  });
  const [validated, setValidated] = useState(false);

  const handleClose = () => {
    setShow(false);
    setFormValues({
      nombre: '',
      descripcion: '',
      imagen: null,
      precio: '', // Reinicia el campo de precio al cerrar el modal
    });
    setValidated(false);
  };

  const handleShow = () => setShow(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const formData = new FormData();
        formData.append('nombre', formValues.nombre);
        formData.append('descripcion', formValues.descripcion);
        formData.append('imagen', formValues.imagen);
        formData.append('precio', formValues.precio); // Agrega el precio al FormData

        await productosService.create(formData);
        handleClose();
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
    setValidated(true);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === 'imagen' ? files[0] : value;

    setFormValues({
      ...formValues,
      [name]: newValue,
    });
  };

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>
        <PlusCircle /> Agregar un Nuevo Producto
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
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Este campo es obligatorio.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="precio"
                value={formValues.precio}
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
                Agregar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
