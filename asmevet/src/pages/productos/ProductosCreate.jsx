import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { PlusCircle } from "react-bootstrap-icons";
import productosService from "../../services/productos.service";
import { InputGroup } from "react-bootstrap";

export default function ProductosCreate() {
  const [show, setShow] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: "",
    descripcion: "",
    imagen: null,
    precio: 0,
  });
  const [validated, setValidated] = useState(false);

  const handleClose = () => {
    setShow(false);
    setFormValues({
      nombre: "",
      descripcion: "",
      imagen: null,
      precio: "",
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
        formData.append("nombre", formValues.nombre);
        formData.append("descripcion", formValues.descripcion);
        formData.append("imagen", formValues.imagen);
        formData.append("precio", formValues.precio); // agregar precio

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
    let newValue;

    if (name === 'imagen') {
      newValue = files[0];
    } else if (name === 'precio') {
      newValue = Math.max(0, parseFloat(value)); // No permitir valores negativos
    } else {
      newValue = value;
    }

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
              <Form.Label>Precio (COP)</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  step="100"
                  name="precio"
                  value={formValues.precio}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                Este campo es obligatorio.
              </Form.Control.Feedback>
              <Form.Text muted>
                Ingresa el precio en pesos colombianos (COP). No es necesario
                incluir decimales (por ejemplo, 1000).
              </Form.Text>
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
