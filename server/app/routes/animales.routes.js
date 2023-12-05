module.exports = (app) => {
  const animales = require('../controllers/animales.controller');
  const router = require("express").Router();

  // Ruta para creación de animales
  router.post("/api/animales", animales.create);

  // Ruta para obtener todos los animales
  router.get("/api/animales", animales.getAllAnimals);

  // Ruta para deshabilitar un animal por ID
  router.patch("/api/animales/:idAnimal", animales.deshabilitarAnimal);

  // Ruta para editar un animal por ID
  router.put("/api/animales/:idAnimal", animales.editarAnimal);


  // Ruta para obtener todos los animales de un usuario por ID
  router.get("/animales/user/:idUser", animales.getAllByUserId);

  app.use("/", router);
};
