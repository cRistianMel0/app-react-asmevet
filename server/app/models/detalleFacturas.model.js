module.exports = (sequelize, Sequelize) => {
    const DetalleFactura = sequelize.define("detalleFacturas", {
        idDetalleFactura: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idProducto: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idFactura: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        valorUnitario: {
            type: Sequelize.DECIMAL(12, 2),
            allowNull: false
        },
        valorTotal: {
            type: Sequelize.DECIMAL(12, 2),
            allowNull: false
        }
    });

    return DetalleFactura;
};
