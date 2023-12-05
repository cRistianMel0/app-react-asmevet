module.exports = (app) => {
  const users = require("../controllers/privateUsers.controller");

  const router = require("express").Router();

  router.get("/api/users/private", users.findAllUsers);
  // Ruta para creación de servicios, incluyendo la subida de archivos
  app.use("/", router);
};
