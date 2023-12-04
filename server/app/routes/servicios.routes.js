module.exports = (app) => {
  const servicios = require("../controllers/serviciosController");

  const router = require("express").Router();

  // Ruta para creación de servicios, incluyendo la subida de archivos
  router.post("/api/servicios/", servicios.create);

  // Obtener todos los servicios
  router.get("/api/servicios/", servicios.findAll);

  // Actualizar un servicio por su id
  router.put("/api/servicios/", servicios.update);

  // Actualizar la disponibilidad de un servicio por su id
  router.patch("/api/servicios/", servicios.updateDisponibilidad);

  // Eliminar un servicio por su id
  router.delete("/api/servicios/:idServicio", servicios.delete);

  // Ruta para servir archivos de imágenes
  router.get("/api/servicios/:idServicio/imagen", servicios.getImageById);


  app.use("/", router);
};
