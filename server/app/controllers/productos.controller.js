const db = require("../models");
const Producto = db.productos; // Asegúrate de que el modelo se importe correctamente
const multer = require('multer');
const path = require('path');

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

    // Crear un Producto
    const producto = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      imagen: req.file ? req.file.path : null, // Ruta de la imagen almacenada
      disponible: req.body.disponible ? req.body.disponible : true,
      precio: req.body.precio,
      existencias: req.body.existencias
    };

    // Guardar el Producto en la base de datos
    Producto.create(producto)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Ocurrió un error al crear el Producto."
        });
      });
  });
};

// Resto de las funciones para encontrar, actualizar, eliminar, etc. para los productos, similares a las del controlador de servicios...

// Obtener todos los Productos desde la base de datos
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

  Producto.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener los productos."
      });
    });
};


// Actualizar un Producto por su id
exports.update = (req, res) => {
  const id = req.body.idProducto;

  Producto.update(req.body, {
    where: { idProducto: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡El Producto se actualizó correctamente!"
        });
      } else {
        res.send({
          message: `No se pudo actualizar el Producto con id=${id}. ¡Quizás no se encontró el Producto o el req.body está vacío!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el Producto con id=" + id
      });
    });
};

// Eliminar un Producto por su id
exports.delete = (req, res) => {
  const id = req.params.idProducto;

  Producto.destroy({
    where: { idProducto: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡El Producto fue eliminado exitosamente!"
        });
      } else {
        res.send({
          message: `No se pudo eliminar el Producto con id=${id}. ¡Quizás no se encontró el Producto!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el Producto con id=" + id
      });
    });
};

// Modificar la disponibilidad de un producto
exports.updateDisponibilidad = (req, res) => {
  const id = req.body.idProducto;

  Producto.update(
    { disponible: false }, // Cambiar a false para indicar no disponible
    { where: { idProducto: id } }
  )
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡La disponibilidad se actualizó correctamente!"
        });
      } else {
        res.send({
          message: `No se pudo actualizar la disponibilidad del Producto con id=${id}. ¡Quizás no se encontró el Producto o req.body está vacío!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar la disponibilidad del Producto con id=" + id
      });
    });
};

// Obtener imagen por ID de Producto
exports.getImageById = function (req, res) {
  const idProducto = req.params.idProducto;

  Producto.findByPk(idProducto, { attributes: ['imagen'] })
    .then(producto => {
      if (!producto) {
        return res.status(404).send('Producto no encontrado');
      }

      // Si se encuentra el producto y tiene imagen, envía el archivo de imagen
      if (producto.imagen) {
        const pathToImage = path.resolve(__dirname, '../..', producto.imagen); // Ruta absoluta de la imagen
        res.sendFile(pathToImage);
      } else {
        res.status(404).send('Imagen no encontrada para este producto');
      }
    })
    .catch(err => {
      res.status(500).send('Error al obtener la imagen del producto: ' + err.message);
    });
};

exports.agregarAlCarrito = (req, res) => {
  const idProducto = req.params.idProducto; // ID del producto que se agregará al carrito
  const idUser = req.params.idUser; // ID del usuario al que se le agregará el producto al carrito

  Producto.findByPk(idProducto)
    .then(producto => {
      if (!producto) {
        return res.status(404).send('Producto no encontrado');
      }

      // Actualizar el campo 'enCarrito' a true y asignar el 'idUser'
      producto.update({ enCarrito: true, idUser: idUser })
        .then(() => {
          res.send({
            message: "¡Producto agregado al carrito exitosamente!"
          });
        })
        .catch(err => {
          res.status(500).send('Error al agregar el producto al carrito: ' + err.message);
        });
    })
    .catch(err => {
      res.status(500).send('Error al obtener el producto: ' + err.message);
    });
};

// Quitar un Producto del carrito por su id
exports.quitarDelCarrito = (req, res) => {
  const idProducto = req.params.idProducto; // ID del producto que se quitará del carrito
  const idUser = req.params.idUser; // ID del usuario del carrito

  Producto.findOne({
    where: { idProducto: idProducto, idUser: idUser, enCarrito: true }
  })
    .then(producto => {
      if (!producto) {
        return res.status(404).send('Producto no encontrado en el carrito');
      }

      // Actualizar el campo 'enCarrito' a false y eliminar el 'idUser'
      producto.update({ enCarrito: false, idUser: null })
        .then(() => {
          res.send({
            message: "¡Producto quitado del carrito exitosamente!"
          });
        })
        .catch(err => {
          res.status(500).send('Error al quitar el producto del carrito: ' + err.message);
        });
    })
    .catch(err => {
      res.status(500).send('Error al obtener el producto del carrito: ' + err.message);
    });
};

// Encontrar los productos que esten en el carrito de un usuario:
exports.obtenerCarritoUsuario = (req, res) => {
  const idUsery = req.params.idUser; // Suponiendo que el ID del usuario está en los parámetros de la URL

  Producto.findAll({
    where: { idUser: idUsery, enCarrito: true }
  })
    .then(products => {
      res.send(products); // Envía la lista de productos en el carrito del usuario
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener los productos en el carrito del usuario."
      });
    });
}
