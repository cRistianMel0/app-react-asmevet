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

//funcion para editar la informacion de un animal
exports.edit = (req, res) => {
  const animalId = req.params.idAnimal; // Suponiendo que el ID del animal está en los parámetros de la URL

  const updatedAnimal = {
      idUser: req.body.idUser,
      nombre: req.body.nombre,
      tipo: req.body.tipo,
      raza: req.body.raza,
      collar: req.body.collar,
      requiereCarnet: req.body.requiereCarnet,
      fechaNacimiento: req.body.fechaNacimiento
  }

  Animal.findByPk(animalId) // Busca el animal por su ID
    .then(animal => {
      if (!animal) {
        return res.status(404).send({ message: "Animal no encontrado." });
      }

      // Actualiza los campos del animal con los nuevos valores
      return animal.update(updatedAnimal);
    })
    .then(updatedData => {
      res.send(updatedData); // Envía los datos actualizados del animal
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al actualizar el Animal."
      });
    });
}
