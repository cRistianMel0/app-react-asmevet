import { useState, useEffect } from "react";
import { PencilSquare, ExclamationTriangle } from "react-bootstrap-icons";
import authService from "../../../services/auth.service";
import "../styled-components/cardProductos.scss";
import { FaShoppingCart } from "react-icons/fa";
import ProductosEdit from "../ProductosEdit";
import productosService from "../../../services/productos.service";
import ProductosBuy from "../ProductosBuy";
import carritosService from "../../../services/carritos.service";

const CardProductos = ({ cards }) => {
  const [editModalShow, setEditModalShow] = useState(false);
  const [buyModalShow, setBuyModalShow] = useState(false);
  const [editedProducto, setEditedProducto] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const currentUser = authService.getCurrentUser();
  const [images, setImages] = useState({});
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);

  useEffect(() => {
    // Obtener las imágenes de los productos
    const fetchImages = async () => {
      const imageRequests = cards.map((producto) => {
        return productosService
          .getImageById(producto.idProducto)
          .then((response) => ({
            id: producto.idProducto,
            image: URL.createObjectURL(response.data),
          }))
          .catch((error) => {
            console.error(
              `Error al obtener la imagen para el producto ${producto.idProducto}: ${error}`
            );
            return { id: producto.idProducto, image: null };
          });
      });

      Promise.all(imageRequests)
        .then((images) => {
          const imageMap = {};
          images.forEach((image) => {
            imageMap[image.id] = image.image;
          });
          setImages(imageMap);
        })
        .catch((error) => {
          console.error(`Error al obtener las imágenes: ${error}`);
        });
      console.log("Datos de los productos:", cards);
    };

    fetchImages();
  }, [cards]);

  // Obtener los productos del carrito del usuario actual
  useEffect(() => {
    const obtenerProductosEnCarritoUsuario = async () => {
      try {
        const response = await carritosService.obtenerProductosEnCarrito(currentUser.id);
        const { productosEnCarrito } = response.data;
        setProductosEnCarrito(productosEnCarrito);
      } catch (error) {
        console.error("Error al obtener productos del carrito:", error);
      }
    };

    obtenerProductosEnCarritoUsuario();
  }, [currentUser.id]);

  const productosConMarca = cards.map(producto => {
    const estaEnCarrito = productosEnCarrito.some(item => item.idProducto === producto.idProducto);
    return { ...producto, enCarrito: estaEnCarrito };
  });

  const handleEdit = (producto) => {
    setEditedProducto(producto);
    setEditModalShow(true);
  };

  const handleSaveEdit = (editedProducto) => {
    productosService.update(editedProducto)
      .then((response) => {
        console.log(response.data);
        setEditModalShow(false);
        alert("¡El producto se actualizó correctamente!");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        window.alert(`Se ha generado un problema en el servidor ${error}`);
      });
  };

  const handleDelete = (producto) => {
    let res = window.confirm(
      "¿Está seguro de que desea DESHABILITAR el producto?"
    );
    if (res) {
      productosService.updateDisponibilidad(producto)
        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
          window.alert(`Se ha generado un problema en el servidor ${error}`);
        });
    }
  };

  const handleBuy = (producto) => {
    setSelectedProduct(producto);
    setBuyModalShow(true);
  };

  const handleAddToCart = (idProducto, idUser) => {
    try {
      carritosService.agregarAlCarrito(idUser, idProducto)
      window.location.reload();
    } catch (error) {
      console.error(error);
      window.alert(`Se ha generado un problema en el servidor ${error}`);
    }

  }

  const handleRemoveFromCart = async (userId, productId) => {
    console.log("UserId:", userId);
    console.log("ProductId:", productId);
    try {
      // Realizar la solicitud para quitar el producto del carrito
      await carritosService.quitarDelCarrito(userId, productId);
      window.location.reload();
    } catch (error) {
      console.error("Error al quitar producto del carrito:", error);
    }
  };


  const handleBuyModalClose = () => {
    setBuyModalShow(false);
  };

  return (
    <>
      {productosConMarca.map((producto, index) => (
        <div className="card" key={index}>
          <div
            className="card-image"
            style={{ backgroundImage: `url(${images[producto.idProducto]})` }}
            onClick={() => handleBuy(producto)}
          ></div>
          <div className="heading">
            {producto.nombre}
            <div className="description">{producto.descripcion}</div>
            <div className="existances">Existencias: {producto.existencias}</div>
            <div className="price-and-button">
              <p className="text-price">${producto.precio}</p>
              {producto.enCarrito === true ? (
                <button
                  className="buy-button bg-danger"
                  onClick={() => handleRemoveFromCart(currentUser.id, producto.idProducto)}
                >
                  Quitar
                  <FaShoppingCart className="buy-icon ms-2" />
                </button>
              ) : (
                <button
                  className="buy-button"
                  onClick={() => handleAddToCart(currentUser.id, producto.idProducto)}
                >
                  Añadir
                  <FaShoppingCart className="buy-icon ms-2" />
                </button>
              )}
            </div>
            <div className="buttons">
              {currentUser &&
                currentUser.roles &&
                currentUser.roles.includes("ROLE_ADMIN") && (
                  <>
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
                  </>
                )}
            </div>
          </div>
        </div>
      ))}
      {editedProducto && (
        <ProductosEdit
          show={editModalShow}
          onClose={() => setEditModalShow(false)}
          producto={editedProducto}
          onSave={handleSaveEdit}
        />
      )}
      {selectedProduct && (
        <ProductosBuy
          show={buyModalShow}
          onClose={handleBuyModalClose}
          producto={selectedProduct}
        />
      )}
    </>
  );
};

export default CardProductos;
