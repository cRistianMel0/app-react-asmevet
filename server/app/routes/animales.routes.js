module.exports = (app) => {
    
    const animales = require('../controllers/animales.controller')
  
    const router = require("express").Router();
  
    // Ruta para creación de animales, incluyendo la subida de archivos
    router.post("/api/animales/", animales.create);

    router.get("/api/animales/", animales.getAllAnimals);

    router.patch("/api/animales/:idAnimal", animales.deshabilitarAnimal)

    router.put("/api/animales/:idAnimal", animales.editarAnimal)

    router.get("/api/animales/:idUser", animales.getAllByUserId)
  
    // Obtener todos los animales

  
  
    app.use("/", router);
  };
  