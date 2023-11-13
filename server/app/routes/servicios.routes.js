module.exports = (app) => {
  const servicios = require("../controllers/serviciosController");

  const router = require("express").Router();

  //Ruta para creación de servicios
  router.post("/api/servicios/", servicios.create);

  //Obtener todos los servicios
  router.get("/api/servicios/", servicios.findAll);

  //Actualizar un servicio
  router.put("/api/servicios/", servicios.update);

  //Actualizar la disponibilidad de un servicio
  router.patch("/api/servicios/", servicios.updateDisponibilidad);

  //Eliminar un servicio
  router.delete("/api/servicios/", servicios.delete);

  app.use("/", router);
};
