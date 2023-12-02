module.exports = (sequelize, Sequelize) => {
    const Imagen = sequelize.define("imagenes", {
        idImagen: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idServicio: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        idProducto: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        imagen: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Imagen;
};
