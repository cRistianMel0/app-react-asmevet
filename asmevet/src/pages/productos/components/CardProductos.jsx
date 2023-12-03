/* eslint-disable react/prop-types */
import { useState,  useEffect } from "react";
import { PencilSquare, ExclamationTriangle } from "react-bootstrap-icons";
import authService from "../../../services/auth.service";
import "../styled-components/cardProductos.scss";
import ProductosEdit from "../ProductosEdit";
import productosService from "../../../services/productos.service";

const CardProductos = ({ cards }) => {


  const [editModalShow, setEditModalShow] = useState(false);
  const [editedProducto, setEditedProducto] = useState(null);
  const currentUser = authService.getCurrentUser();
  const [images, setImages] = useState({}); // Agregando estado para almacenar las imágenes

  useEffect(() => {
    // Obtener las imágenes de los servicios
    const fetchImages = async () => {
      const imageRequests = cards.map(producto => {
        return productosService.getImageById(producto.idProducto)
          .then(response => ({
            id: producto.idProducto,
            image: URL.createObjectURL(response.data)
          }))
          .catch(error => {
            console.error(`Error al obtener la imagen para el producto ${producto.idProducto}: ${error}`);
            return { id: producto.idProducto, image: null };
          });
      });

      Promise.all(imageRequests)
        .then(images => {
          const imageMap = {};
          images.forEach(image => {
            imageMap[image.id] = image.image;
          });
          setImages(imageMap);
        })
        .catch(error => {
          console.error(`Error al obtener las imágenes: ${error}`);
        });
    };

    fetchImages();
  }, [cards]);


  const handleEdit = (producto) => {
    setEditedProducto(producto);
    setEditModalShow(true);
  };

  const handleSaveEdit = (editedProducto) => {
    // Lógica para guardar la edición del producto
    // ...
    setEditModalShow(false);
    alert("¡El producto se actualizó correctamente!");
    window.location.reload();
  };

  const handleDelete = (producto) => {
    // Lógica para deshabilitar o eliminar el producto
    // ...
    window.location.reload();
  };

  return (
    <>
      {cards.map((producto, index) => (
        <div className="card" key={index}>
          <div className="card-image" style={{ backgroundImage: `url(${images[producto.idProducto]})`}}></div>
          <div className="card-info">
            <p className="text-title">{producto.nombre}</p>
            <p className="text-body">{producto.description}</p>
          </div>
          <div className="card-footer">
            <span className="text-title">${producto.precio}</span>
            <div className="card-button">
              <svg className="svg-icon" viewBox="0 0 20 20">
                {/* Tu contenido SVG */}
              </svg>
            </div>
          </div>
          {currentUser &&
            currentUser.roles &&
            currentUser.roles.includes("ROLE_ADMIN") && (
              <div className="buttons">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(producto)}
                >
                  <PencilSquare />
                </button>
                <button
                  className="disable-button"
                  onClick={() => handleDelete(producto)}
                >
                  <ExclamationTriangle />
                </button>
              </div>
            )}
        </div>
      ))}
      {/* Modal de edición para productos */}
      {editedProducto && (
        <ProductosEdit
          show={editModalShow}
          onClose={() => setEditModalShow(false)}
          producto={editedProducto}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
};

export default CardProductos;
