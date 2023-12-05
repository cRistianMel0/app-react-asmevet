const db = require("../models");
const Animal = db.animales;

//Meotdo para crear un animal
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

//Metodo para editar la informacion de un animal
exports.editarAnimal = (req, res) => {
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


//Metodo para deshabilitar una mascota
exports.deshabilitarAnimal = (req, res) => {
  const animalId = req.params.idAnimal;

  Animal.findByPk(animalId)
    .then(animal => {
      if (!animal) {
        return res.status(404).send({ message: "Animal no encontrado." });
      }

      // Actualiza el campo 'disponible' a 'false'
      animal.update({ disponible: false })
        .then(updatedAnimal => {
          res.send(updatedAnimal);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Ocurrió un error al deshabilitar el animal."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al buscar el animal."
      });
    });
}


//Metodo para obtener todos los animales de un usuario
exports.getAllByUserId = (req, res) => {
  const userId = req.params.idUser;

  Animal.findAll({
    where: { idUser: userId }
  })
    .then(animals => {
      res.send(animals);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener los animales del usuario."
      });
    });
}
