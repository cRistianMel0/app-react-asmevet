module.exports = (app) => {
    const productos = require("../controllers/productos.controller");
  
    const router = require("express").Router();
  
    // Ruta para creación de productos, incluyendo la subida de archivos
    router.post("/api/productos/", productos.create);
  
    // Obtener todos los productos
    router.get("/api/productos/", productos.findAll);
  
    // Actualizar un servicio por su id
    router.put("/api/productos/", productos.update);
  
    // Actualizar la disponibilidad de un servicio por su id
    router.patch("/api/productos/", productos.updateDisponibilidad);
  
    // Eliminar un servicio por su id
    router.delete("/api/productos/:idProducto", productos.delete);
  
    // Ruta para servir archivos de imágenes
    router.get("/api/productos/:idProducto/imagen", productos.getImageById);
  
    app.use("/", router);
  };
  