module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("productos", {
      idProducto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      disponible: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      precio: {
        type: Sequelize.DECIMAL(10, 2), // Por ejemplo, 10 dígitos totales con 2 decimales
        allowNull: false
      }
    });
  
    return Producto;
  };
  