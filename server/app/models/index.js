const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.servicios = require("../models/servicios.models.js")(sequelize, Sequelize);
db.productos = require("../models/productos.model.js")(sequelize, Sequelize);
db.categorias = require("../models/categorias.model.js")(sequelize, Sequelize);
db.marcas = require("../models/marcas.mode.js")(sequelize, Sequelize);
db.especialidades = require("../models/especialidades.model.js")(sequelize, Sequelize);
db.animales = require("../models/animales.model.js")(sequelize, Sequelize);
db.facturas = require("../models/facturas.model.js")(sequelize, Sequelize);
db.detalleFacturas = require("../models/detalleFacturas.model.js")(sequelize, Sequelize);
db.detalleServicios = require("../models/detalleServicios.model.js")(sequelize, Sequelize);
db.atenciones = require("../models/atenciones.model.js")(sequelize, Sequelize);



db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
