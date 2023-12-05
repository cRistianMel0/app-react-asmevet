module.exports = (app) => {
  const carritos = require('../controllers/carrito.controller');
  const router = require("express").Router();

  router.post("/api/carrito/:idUser/:idProducto", carritos.create);

  router.get("/api/carrito/:idUser", carritos.getCarritosUsuario);

  

  app.use("/", router);
};
