module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    idUsers: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idEspecialidad: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    apellido: {
      type: Sequelize.STRING,
      allowNull: true
    },
    tipoDoc: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Cédula"
    },
    documento: {
      type: Sequelize.STRING,
      allowNull: false
    },
    telefono: {
      type: Sequelize.STRING,
      allowNull: false
    },
    direccion: {
      type: Sequelize.STRING,
      allowNull: false
    },
    correo: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return User;
};
