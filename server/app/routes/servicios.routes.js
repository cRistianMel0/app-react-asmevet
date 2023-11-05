module.exports = app => {
    const servicios = require("../controllers/servicios.controller");

    var router = require("express").Router();

    //Ruta para creación de servicios
    router.post("/servicios", servicios.create);

    //Obtener todos los servicios 
    router.get("/servicios", servicios.findAll);

    //Actualizar un servicio
    router.put("/servicios", servicios.update);

    //Actualizar la disponibilidad de un servicio
    router.patch("/servicios", servicios.updateDisponibilidad);

    //Eliminar un servicio
    router.delete("/servicios", servicios.delete);

    // Agregar esta línea para que Express utilice el router
    app.use('/', router);
}
