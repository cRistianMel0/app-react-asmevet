const db = require("../models");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    apellido: req.body.apellido,
    tipoDoc: req.body.tipoDoc || 'Cédula',
    documento: req.body.documento,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    correo: req.body.correo,
    genero: req.body.genero,
    fechaNacimiento: req.body.fechaNacimiento,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      res.send({ message: "User registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      res.status(200).send({
        id: user.id,
        username: user.username,
        apellido: user.apellido,
        tipoDoc: user.tipoDoc,
        documento: user.documento,
        telefono: user.telefono,
        direccion: user.direccion,
        correo: user.correo,
        genero: user.genero,
        fechaNacimiento: user.fechaNacimiento,
        email: user.email,
        roles: [], // No estoy seguro de cómo manejar los roles en tu aplicación, aquí los dejé vacíos
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
