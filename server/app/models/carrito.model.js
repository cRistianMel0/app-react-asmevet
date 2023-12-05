module.exports = (sequelize, Sequelize) => {
    const Carrito = sequelize.define("carrito", {
      idUser: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      idProducto: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      enCarrito: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });

    Carrito.associate = (models) => {
      Carrito.belongsToMany(models.Producto, { through: 'Carrito', foreignKey: 'idUser' });
  };

    return Carrito;
  };
  