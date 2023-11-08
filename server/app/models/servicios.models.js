module.exports = (sequelize, Sequelize) => {
    const Servicio = sequelize.define("servicios", {
      idServicio: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion: {
        type: Sequelize.STRING(255), // Cambiado a STRING(255) para que coincida con la definición en la base de datos
        allowNull: false
      },
      imagen: {
        type: Sequelize.STRING(255), // Cambiado a STRING(255) para que coincida con la definición en la base de datos
        allowNull: true
      },
      disponible: {
        type: Sequelize.BOOLEAN, // Cambiado a BOOLEAN para que coincida con la definición en la base de datos
        allowNull: false,
        defaultValue: true
      }
    });
  
    return Servicio;
  };