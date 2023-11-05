const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/servicios.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
db.sequelize.sync().then(() => {
  initial(); // Llamada a la función initial() después de sincronizar la base de datos

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});

async function initial() {
  try {
    let role = await Role.findOne({ where: { id: 1 } });
    if (!role) {
      await Role.create({ id: 1, name: "user" });
    }

    role = await Role.findOne({ where: { id: 2 } });
    if (!role) {
      await Role.create({ id: 2, name: "moderator" });
    }

    role = await Role.findOne({ where: { id: 3 } });
    if (!role) {
      await Role.create({ id: 3, name: "admin" });
    }

    console.log("Roles inicializados correctamente.");
  } catch (error) {
    console.error("Error al inicializar roles:", error);
  }
}
