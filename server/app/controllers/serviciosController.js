const db = require("../models");
const Servicio = db.servicios;
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'app/uploads/'); // Ruta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo
  }
});

const upload = multer({ storage: storage }).single('imagen');

exports.create = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    console.log('Req Body:', req.body); // Verificar los datos recibidos en el cuerpo de la solicitud
    console.log('Req File:', req.file); // Verificar la información del archivo subido

    // Crear un Servicio
    const servicio = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      imagen: req.file ? req.file.path : null, // Ruta de la imagen almacenada
      disponible: req.body.disponible ? req.body.disponible : 1
    };

    // Guardar el Servicio en la base de datos
    Servicio.create(servicio)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Ocurrió un error al crear el Servicio."
        });
      });
  });
};



// Obtener todos los Servicios desde la base de datos
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

  Servicio.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener los servicios."
      });
    });
};


// Actualizar un Servicio por su id
exports.update = (req, res) => {
  const id = req.body.idServicio;

  Servicio.update(req.body, {
    where: { idServicio: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡El Servicio se actualizó correctamente!"
        });
      } else {
        res.send({
          message: `No se pudo actualizar el Servicio con id=${id}. ¡Quizás no se encontró el Servicio o el req.body está vacío!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el Servicio con id=" + id
      });
    });
};

// Eliminar un Servicio por su id
exports.delete = (req, res) => {
  const id = req.params.idServicio;

  Servicio.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡El Servicio fue eliminado exitosamente!"
        });
      } else {
        res.send({
          message: `No se pudo eliminar el Servicio con id=${id}. ¡Quizás no se encontró el Servicio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el Servicio con id=" + id
      });
    });
};

// Modificar la disponibilidad de un servicio
exports.updateDisponibilidad = (req, res) => {
  const id = req.body.idServicio;

  Servicio.update(
    { disponible: 0 },
    { where: { idServicio: id } }
  )
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡La disponibilidad se actualizó correctamente!"
        });
      } else {
        res.send({
          message: `No se pudo actualizar la disponibilidad del Servicio con id=${id}. ¡Quizás no se encontró el Servicio o req.body está vacío!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar la disponibilidad del Servicio con id=" + id
      });
    });
};