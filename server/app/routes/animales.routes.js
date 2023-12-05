module.exports = (app) => {
    
    const animales = require('../controllers/animales.controller')
  
    const router = require("express").Router();
  
    // Ruta para creación de animales, incluyendo la subida de archivos
    router.post("/api/animales/", animales.create);
  
    // Obtener todos los animales

  
  
    app.use("/", router);
  };
  