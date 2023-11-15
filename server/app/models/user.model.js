module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    idEspecialidad: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apellido: {
      type: Sequelize.STRING,
      allowNull: true
    },
    tipoDoc: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Cédula'
    },
    documento: {
      type: Sequelize.STRING(14),
      allowNull: false
    },
    telefono: {
      type: Sequelize.STRING(14),
      allowNull: false
    },
    direccion: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    genero: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    fechaNacimiento: {
      type: Sequelize.DATE,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false
    }
  });

  return User;
};
