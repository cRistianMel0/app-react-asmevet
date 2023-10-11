import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'; // Agregué la importación de axios

export default function ServiciosCreate() {
  const [servicio, setServicio] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = async (e) => {
    e.preventDefault(); // Cambié "prevenDefault" a "preventDefault"
    try {
      await axios.post("http://localhost:8000/servicios", servicio);
    } catch (err) {
      console.log(err);
    }
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setServicio(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>
        <i className="fas fa-plus"></i> Agrega un Nuevo Servicio
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¡Agrega el nuevo servicio que ofrecerá tu veterinaria!
          <div className='container form'>
            <div className='a'>
              <div>
                <label htmlFor="nombre">Nombre Servicio</label> {/* Agregué el htmlFor */}
              </div>
              <div>
                <input type="text" onChange={handleChange} placeholder='Nombre Servicio' name='nombre' />
              </div>
            </div>
          </div>
          <div className='container form'>
            <div className='a'>
              <div>
                <label htmlFor="descripcion">Descripción</label> {/* Agregué el htmlFor */}
              </div>
              <div>
                <input type="text" onChange={handleChange} placeholder='Descripción' name='descripcion' />
              </div>
            </div>
          </div>
          <div className='container form'>
            <div className='a'>
              <div>
                <label htmlFor="imagen">Imagen</label> {/* Agregué el htmlFor */}
              </div>
              <div>
                <input type="text" onChange={handleChange} placeholder='Imagen' name='imagen' />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
