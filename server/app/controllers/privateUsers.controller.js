const db = require("../models");
const User = db.user


exports.findAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.send(users);
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error al obtener todos los usuarios."
      });
    }
  };