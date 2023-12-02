module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define("categorias", {
      idCategoria: {
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
      }
    });
  
    return Categoria;
  };
  