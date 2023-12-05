module.exports = (sequelize, Sequelize) => {
    const Carrito = sequelize.define("carrito", {
      idUser: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      idProducto: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });

    return Carrito;
  };
  