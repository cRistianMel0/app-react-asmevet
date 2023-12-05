module.exports = (app) => {
    
    const animales = require('../controllers/animales.controller')
  
    const router = require("express").Router();
  
    // Ruta para creación de animales, incluyendo la subida de archivos
    router.post("/api/animales/", animales.create);

    router.patch("/api/animales/:idAnimal", animales.deshabilitarAnimal)

    router.put("/api/animales/:idAnimal", animales.editarAnimal)
  
    // Obtener todos los animales

  
  
    app.use("/", router);
  };
  