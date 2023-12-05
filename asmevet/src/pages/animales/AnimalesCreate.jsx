/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { PlusCircle } from "react-bootstrap-icons";
// import animalService from "../../services/animal.service";

export default function AnimalesCreate() {
  const [show, setShow] = useState(false);
  const [formValues, setFormValues] = useState({
    idUser: "",
    nombre: "",
    tipo: "",
    raza: "",
    collar: false,
    requiereCarnet: false,
    fechaNacimiento: "",
  });
  const [validated, setValidated] = useState(false);

  const handleClose = () => {
    setShow(false);
    setFormValues({
      idUser: "", 
      nombre: "",
      tipo: "",
      raza: "",
      collar: false,
      requiereCarnet: false,
      fechaNacimiento: "",
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
        await animalService.create(formValues);
        handleClose();
        window.location.reload(); 
      } catch (err) {
        console.log(err);
      }
    }
    setValidated(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;

    if (type === "checkbox") {
      newValue = checked;
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
        <PlusCircle /> Agregar un Nuevo Animal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Animal</Modal.Title>
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
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                name="tipo"
                value={formValues.tipo}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Este campo es obligatorio.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Raza</Form.Label>
              <Form.Control
                type="text"
                name="raza"
                value={formValues.raza}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Este campo es obligatorio.
              </Form.Control.Feedback>
            </Form.Group>
            <div className="row">
              <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Cuenta con Collar"
                name="collar"
                checked={formValues.collar}
                onChange={handleInputChange}
              />
            </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Requiere Carnet"
                name="requiereCarnet"
                checked={formValues.requiereCarnet}
                onChange={handleInputChange}
              />
            </Form.Group>
              </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                name="fechaNacimiento"
                value={formValues.fechaNacimiento}
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
