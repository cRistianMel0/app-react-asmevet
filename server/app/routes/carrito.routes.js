module.exports = (app) => {
  const carritos = require('../controllers/carrito.controller');
  const router = require("express").Router();

  router.post("/api/carrito/:idUser/:idProducto", carritos.agregarAlCarrito);

  router.get("/api/carrito/:idUser", carritos.obtenerProductosEnCarrito);

  

  app.use("/", router);
};
