const db = require("../models");
const config = require("../config/auth.config");
const User = db.users; // Cambiado de `db.user` a `db.users`
const Role = db.roles; // Agregado

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    idUser: req.body.idUser, // Agregado si es necesario
    idEspecialidad: req.body.idEspecialidad, // Agregado si es necesario
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    tipoDoc: req.body.tipoDoc,
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
      if (req.body.roles) {
        Role.findAll({
          where: {
            nombre: {
              [Op.or]: req.body.roles // Cambiado de name a nombre
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email // Cambiado de username a nombre
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

      const token = jwt.sign({ id: user.idUser }, // Cambiado de id a idUser
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].nombre.toUpperCase()); // Cambiado de name a nombre
        }
        res.status(200).send({
          id: user.idUser, // Cambiado de id a idUser
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
