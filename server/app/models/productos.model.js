module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("productos", {
      idProducto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      idUser: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      enCarrito: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
      existencias: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      precio: {
        type: Sequelize.DECIMAL(10, 2), // Por ejemplo, 10 dígitos totales con 2 decimales
        allowNull: false
      },
      imagen: {
        type: Sequelize.STRING(255), // Cambiado a STRING(255) para que coincida con la definición en la base de datos
        allowNull: true
      },
    });
  
    return Producto;
  };
  