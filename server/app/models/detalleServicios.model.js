module.exports = (sequelize, Sequelize) => {
    const DetalleServicio = sequelize.define("detalleServicios", {
        idDetalleServicio: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUser: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idServicio: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fechaHora: {
            type: Sequelize.DATE,
            allowNull: false
        },
        formaPago: {
            type: Sequelize.STRING,
            allowNull: false
        },
        valor: {
            type: Sequelize.DECIMAL(12,2),
            allowNull: false

        }
    });

    return DetalleServicio;
};
