module.exports = (sequelize, Sequelize) => {
    const Factura = sequelize.define("facturas", {
        idFactura: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUser: {
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
        total:{
            type: Sequelize.DECIMAL(12,2),
            allowNull: false
        }
    });

    return Factura;
};
