const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    apellido: req.body.apellido,
    tipoDoc: req.body.tipoDoc,
    documento: req.body.documento,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    email: req.body.email,
    genero: req.body.genero,
    fechaNacimiento: req.body.fechaNacimiento,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
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
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
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

      var authorities = [];
      var roleIds = []; // Este arreglo lo cree para almacenar IDs de roles ya que un usuario puede tener varios roles

      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
          roleIds.push(roles[i].id); // Almacena cada ID de rol
        }
        res.status(200).send({
          id: user.id,
          nombre: user.username,
          apellido: user.apellido,
          tipoDoc: user.tipoDoc,
          documento: user.documento,
          telefono: user.telefono,
          direccion: user.direccion,
          genero: user.genero,
          email: user.email,
          fechaNacimiento: user.fechaNacimiento,
          roles: authorities,
          roleIds: roleIds, // Envia todos los IDs de roles
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.updateUser = (req, res) => {
  const userId = req.body.id; // Obtener el ID del usuario de la solicitud (puedes usar algún middleware para esto)
  User.findByPk(userId) // Buscar el usuario por su ID
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      // Actualizar los campos que se reciben en la solicitud
      user.username = req.body.username || user.username;
      user.apellido = req.body.apellido || user.apellido;
      user.tipoDoc = req.body.tipoDoc || user.tipoDoc;
      user.documento = req.body.documento || user.documento;
      user.telefono = req.body.telefono || user.telefono;
      user.direccion = req.body.direccion || user.direccion;
      user.email = req.body.email || user.email;
      user.genero = req.body.genero || user.genero;
      user.fechaNacimiento = req.body.fechaNacimiento || user.fechaNacimiento;

      // Guardar los cambios en la base de datos
      user.save()
        .then(updatedUser => {
          res.status(200).send({ message: "User updated successfully!", user: updatedUser });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Metodo que obtenga todos los veterinarios
exports.obtenerUsuariosRol = (req, res) => {
  const roleId = req.params.id; // ID del rol que quieres buscar

  User.findAll({
    include: [
      {
        model: Role,
        where: { id: roleId }
      }
    ]
  })
    .then(users => {
      if (!users || users.length === 0) {
        return res.status(404).send({ message: "Users with Role ID 2 not found." });
      }

      const usersWithRoleId2 = users.map(user => ({
        id: user.id,
        nombre: user.username,
        apellido: user.apellido,
        tipoDoc: user.tipoDoc,
        documento: user.documento,
        telefono: user.telefono,
        direccion: user.direccion,
        genero: user.genero,
        email: user.email,
        fechaNacimiento: user.fechaNacimiento,
        // Otros campos del usuario que quieras devolver
      }));

      res.status(200).send({ users: usersWithRoleId2 });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
