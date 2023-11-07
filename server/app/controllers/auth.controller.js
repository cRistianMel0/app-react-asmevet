const db = require("../models");
<<<<<<< HEAD
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
=======
const User = db.user;
>>>>>>> d494e8afdc3ac8d4809fed73bae95ee40a896cb9

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
<<<<<<< HEAD
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    tipoDoc: req.body.tipoDoc,
    documento: req.body.documento,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
=======
    username: req.body.username,
    apellido: req.body.apellido,
    tipoDoc: req.body.tipoDoc || 'Cédula',
    documento: req.body.documento,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    correo: req.body.correo,
    genero: req.body.genero,
    fechaNacimiento: req.body.fechaNacimiento,
>>>>>>> d494e8afdc3ac8d4809fed73bae95ee40a896cb9
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
<<<<<<< HEAD
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
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
=======
      res.send({ message: "User registered successfully!" });
>>>>>>> d494e8afdc3ac8d4809fed73bae95ee40a896cb9
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
<<<<<<< HEAD
      email: req.body.email
=======
      username: req.body.username
>>>>>>> d494e8afdc3ac8d4809fed73bae95ee40a896cb9
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

<<<<<<< HEAD
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
=======
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
>>>>>>> d494e8afdc3ac8d4809fed73bae95ee40a896cb9
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
