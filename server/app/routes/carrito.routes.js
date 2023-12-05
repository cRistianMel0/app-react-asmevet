module.exports = (app) => {
  const carritos = require('../controllers/carrito.controller');
  const router = require("express").Router();

  router.post("/api/carrito/:idUser/:idProducto", carritos.create)

  app.use("/", router);
};
