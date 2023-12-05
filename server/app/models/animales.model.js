module.exports = (sequelize, Sequelize) => {
    const Animal = sequelize.define("animales", {
      idAnimal: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      idUser:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo:{
        type: Sequelize.STRING,
        allowNull: false
      },
      raza:{
        type: Sequelize.STRING,
        allowNull: false
      },
      collar: {
        type:  Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      disponible :{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      requiereCarnet: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      fechaNacimiento: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  
    return Animal;
  };
  