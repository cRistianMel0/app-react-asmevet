module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
<<<<<<< HEAD
    idUsers: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
=======
>>>>>>> d494e8afdc3ac8d4809fed73bae95ee40a896cb9
    idEspecialidad: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
<<<<<<< HEAD
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
=======
    username: {
      type: Sequelize.STRING
>>>>>>> d494e8afdc3ac8d4809fed73bae95ee40a896cb9
    },
    apellido: {
      type: Sequelize.STRING,
      allowNull: true
    },
    tipoDoc: {
      type: Sequelize.STRING,
      allowNull: false,
<<<<<<< HEAD
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
=======
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
      type: Sequelize.STRING
    },
    genero: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    fechaNacimiento: {
      type: Sequelize.DATE,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: true
>>>>>>> d494e8afdc3ac8d4809fed73bae95ee40a896cb9
    }
  });

  return User;
};
