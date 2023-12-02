const { DATEONLY } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Atenccion = sequelize.define("atencciones", {
        idAtenccion: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idAnimal: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idVeterinario: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idDetalleServicio: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        patologias: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rasgosFisicos: {
            type: Sequelize.STRING,
            allowNull: false
        },
        comportamiento: {
            type: Sequelize.STRING,
            allowNull: false
        },
        requiereHospitalizacion: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    return Atenccion;
};
