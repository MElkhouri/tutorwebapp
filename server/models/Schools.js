module.exports = (sequelize, DataTypes) => {
    const Schools = sequelize.define("Schools", {
        school: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Schools
}