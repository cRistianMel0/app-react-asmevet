/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { InputGroup, Row, Col } from "react-bootstrap";
import './styled-components/buyButton.scss';

export default function ProductosBuy({ show, onClose, producto, onBuy }) {
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    setCantidad(1);
  }, [producto]);

  const handleBuy = () => {
    const isConfirmed = window.confirm("¿Está seguro de realizar la compra del producto?");

    if (isConfirmed) {
      onBuy({
        producto,
        cantidad,
      });

      console.log("Su compra se ha efectuado. Se ha enviado la factura de la compra a su correo electrónico.");
      alert("Su compra se ha efectuado. Se ha enviado la factura de la compra a su correo electrónico.");
      onClose();
    }
  };

  const calculateTotal = () => {
    return producto.precio * cantidad;
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Comprar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="product">
          <h1 className="text-center">{producto.nombre}</h1>
        </div>
        <Form>
          <Form.Group className="mt-4 mb-3">
            <Form.Control value={producto.descripcion} readOnly />
          </Form.Group>
          <Row className="mb-2">
            <Col>
              <Form.Group>
                <Form.Label>Precio del Producto</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    value={producto.precio}
                    readOnly
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Cantidad a Comprar</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max={producto.existencias}
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Forma de Pago</Form.Label>
                <Form.Control as="select">
                  <option>Tarjeta de Crédito</option>
                  <option>Tarjeta de Débito</option>
                  <option>CR Contra Entrega</option>
                  <option>Otro</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Valor Total</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control type="text" value={calculateTotal()} readOnly />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="button-buy-container" onClick={handleBuy}>
          <div className="buy-container">
            <div className="left-side">
              <div className="card">
                <div className="card-line"></div>
                <div className="buttons"></div>
              </div>
              <div className="post">
                <div className="post-line"></div>
                <div className="screen">
                  <div className="dollar">$</div>
                </div>
                <div className="numbers"></div>
                <div className="numbers-line2"></div>
              </div>
            </div>
            <div className="right-side">
              <div className="new">Realizar Compra</div>

              <svg
                viewBox="0 0 451.846 451.847"
                height="512"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
                className="arrow"
              >
                <path
                  fill="#cfcfcf"
                  data-old_color="#000000"
                  className="active-path"
                  data-original="#000000"
                  d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z"
                ></path>
              </svg>
            </div>
          </div>
        </button>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
