const db =require("../models");
const Animal = db.animales;

exports.create = (req, res) => {
    const animal = {
        idUser: req.body.idUser,
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        raza: req.body.raza,
        collar: req.body.collar,
        requiereCarnet: req.body.requiereCarnet,
        fechaNacimiento: req.body.fechaNacimiento
    }

    Animal.create(animal)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Ocurrió un error al crear el Animal."
        });
      });
}