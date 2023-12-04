/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function ProductosEdit({ show, onClose, producto, onSave }) {
  const [editedProducto, setEditedProducto] = useState({
    idProducto: producto.idProducto,
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    imagen: producto.imagen,
  });

  useEffect(() => {
    setEditedProducto({
      idProducto: producto.idProducto,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagen: producto.imagen,
    });
  }, [producto]);

  const handleSave = () => {
    onSave(editedProducto);
    onClose();
  };

  return (
    <Modal show={show} onHidProductoe={onClose}>
      <Modal.Header closeButton>
        <Modal.nombre>Editar Producto</Modal.nombre>
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
            <Form.Control
              type="text"
              value={editedProducto.precio}
              onChange={(e) =>
                setEditedProducto({
                  ...editedProducto,
                  precio: e.target.value,
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
