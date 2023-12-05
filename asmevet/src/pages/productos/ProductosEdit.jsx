/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { InputGroup } from "react-bootstrap";

export default function ProductosEdit({ show, onClose, producto, onSave }) {
  const [editedProducto, setEditedProducto] = useState({
    idProducto: producto.idProducto,
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    existencias: producto.existencias
  });

  useEffect(() => {
    setEditedProducto({
      idProducto: producto.idProducto,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      existencias: producto.existencias
    });
  }, [producto]);

  const handleSave = () => {
    onSave(editedProducto);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              value={editedProducto.nombre}
              onChange={(e) =>
                setEditedProducto({ ...editedProducto, nombre: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción del Producto</Form.Label>
            <Form.Control
              as="textarea"
              value={editedProducto.descripcion}
              onChange={(e) =>
                setEditedProducto({
                  ...editedProducto,
                  descripcion: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio del Producto</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                step="100"
                value={editedProducto.precio}
                onChange={(e) =>
                  setEditedProducto({
                    ...editedProducto,
                    precio: e.target.value,
                  })
                }
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Existencias</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                  <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                </svg>
              </InputGroup.Text>
              <Form.Control
                type="number"
                value={editedProducto.existencias} // Agrega esta línea para mostrar el valor actual
                onChange={(e) =>
                  setEditedProducto({
                    ...editedProducto,
                    existencias: e.target.value,
                  })
                }
              />

            </InputGroup>
            <Form.Control.Feedback type="invalid">
              Este campo es obligatorio.
            </Form.Control.Feedback>
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
