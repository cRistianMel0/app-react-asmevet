const db = require("../models");
const Carrito = db.carritos;
const Producto = db.productos;

exports.create = (req, res) => {
    const carrito = {
        idUser: req.params.idUser,
        idProducto: req.params.idProducto
    }

    Carrito.create(carrito)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el carrito."
            });
        });
}

//Encontrar todos los carritos de un usuario
exports.getCarritosUsuario = (req, res) => {
    const userId = req.params.idUser;

    Carrito.findAll({
        where: { idUser: userId }
    })
    .then(carritos => {
        res.send(carritos);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió un error al obtener los carritos del usuario."
        });
    });
}
