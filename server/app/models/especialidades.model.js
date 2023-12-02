module.exports = (sequelize, Sequelize) => {
    const Especialidad = sequelize.define("especialidades", {
      idEspecialidad: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Especialidad;
  };
  