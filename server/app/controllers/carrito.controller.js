const db = require("../models");
const User = db.user;
const Producto = db.productos;

exports.agregarAlCarrito = (req, res) => {
    const userId = req.params.idUser;
    const productoId = req.params.idProducto;

    // Asegúrate de que el usuario y el producto existan antes de agregar al carrito
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "Usuario no encontrado." });
            }

            Producto.findByPk(productoId)
                .then(producto => {
                    if (!producto) {
                        return res.status(404).send({ message: "Producto no encontrado." });
                    }

                    // Agregar el producto al carrito
                    user.addProductos(producto)
                        .then(() => {
                            res.status(200).send({ message: "Producto agregado al carrito correctamente." });
                        })
                        .catch(err => {
                            res.status(500).send({ message: err.message });
                        });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.obtenerProductosEnCarrito = (req, res) => {
    const userId = req.params.idUser; // Suponiendo que el ID del usuario viene como parámetro en la URL

    // Encuentra al usuario por su ID y carga sus productos asociados sin incluir la información de la tabla "carritos"
    User.findByPk(userId, {
        include: [
            {
                model: Producto,
                as: 'productos',
                through: { attributes: [] } // Esto evita que se incluyan los detalles de la tabla carritos
            }
        ]
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "Usuario no encontrado." });
            }

            // Verifica si el usuario tiene productos en su carrito
            if (!user.productos || user.productos.length === 0) {
                return res.status(404).send({ message: "El usuario no tiene productos en el carrito." });
            }

            // Devuelve solo los detalles de los productos en el carrito del usuario
            const productosEnCarrito = user.productos.map(producto => ({
                idProducto: producto.idProducto,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                disponible: producto.disponible,
                existencias: producto.existencias,
                precio: producto.precio,
                imagen: producto.imagen,
                enCarrito: true,
                createdAt: producto.createdAt,
                updatedAt: producto.updatedAt
            }));

            res.status(200).send({ productosEnCarrito });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.quitarDelCarrito = (req, res) => {
    const userId = req.params.idUser;
    const productoId = req.params.idProducto;

    // Asegúrate de que el usuario exista antes de quitar del carrito
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "Usuario no encontrado." });
            }

            Producto.findByPk(productoId)
                .then(producto => {
                    if (!producto) {
                        return res.status(404).send({ message: "Producto no encontrado." });
                    }

                    // Quita el producto del carrito del usuario
                    user.removeProductos(producto)
                        .then(() => {
                            // Verifica si el carrito está vacío después de quitar el producto
                            user.countProductos().then(count => {
                                if (count === 0) {
                                    return res.status(200).send({ message: "Último producto eliminado, carrito vacío." });
                                } else {
                                    return res.status(200).send({ message: "Producto quitado del carrito correctamente." });
                                }
                            }).catch(err => {
                                res.status(500).send({ message: err.message });
                            });
                        })
                        .catch(err => {
                            res.status(500).send({ message: err.message });
                        });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
