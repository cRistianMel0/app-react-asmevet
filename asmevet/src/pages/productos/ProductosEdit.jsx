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
  });

  useEffect(() => {
    setEditedProducto({
      idProducto: producto.idProducto,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
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
