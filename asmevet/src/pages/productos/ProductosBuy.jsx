/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { InputGroup } from "react-bootstrap";

export default function ProductosBuy({ show, onClose, producto, onBuy }) {
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    setCantidad(1); // Restaurar la cantidad a 1 cuando cambie el producto
  }, [producto]);

  const handleBuy = () => {
    // Lógica para realizar la compra con la cantidad seleccionada
    // Puedes pasar la información necesaria a la función onBuy
    onBuy({
      producto,
      cantidad,
    });
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Comprar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="product">
          {producto && producto.nombre && (
            <>
              <h1>{producto.nombre}</h1>
              {producto.imagen && (
                <img
                  className="product-img"
                  src={producto.imagen}
                  alt={producto.nombre}
                />
              )}
            </>
          )}
        </div>
        <Form>
          <Form.Group>
            <Form.Label>Descripción del Producto</Form.Label>
            <Form.Control value={producto.descripcion} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio del Producto</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                step="100"
                value={producto.precio}
                readOnly
              />
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Cantidad a Comprar</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleBuy}>
          Realizar Compra
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
