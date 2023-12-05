const db = require("../models");
const Carrito = db.carritos;

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
