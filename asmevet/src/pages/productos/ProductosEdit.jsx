/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function ProductosEdit({ show, onClose, producto, onSave }) {
  const [editedProducto, setEditedProducto] = useState({
    id: producto.id,
    title: producto.title,
    description: producto.description,
    price: producto.price,
    imagen: producto.imagen,
  });

  useEffect(() => {
    setEditedProducto({
      id: producto.id,
      title: producto.title,
      description: producto.description,
      price: producto.price,
      imagen: producto.imagen,
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
              value={editedProducto.title}
              onChange={(e) =>
                setEditedProducto({ ...editedProducto, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción del Producto</Form.Label>
            <Form.Control
              as="textarea"
              value={editedProducto.description}
              onChange={(e) =>
                setEditedProducto({
                  ...editedProducto,
                  description: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio del Producto</Form.Label>
            <Form.Control
              type="text"
              value={editedProducto.price}
              onChange={(e) =>
                setEditedProducto({
                  ...editedProducto,
                  price: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Imagen del Producto</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) =>
                setEditedProducto({
                  ...editedProducto,
                  imagen: e.target.files[0],
                })
              }
            />
            {editedProducto.imagen && (
              <img
                src={URL.createObjectURL(editedProducto.imagen)}
                alt="Imagen del producto"
              />
            )}
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
