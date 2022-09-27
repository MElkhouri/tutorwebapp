module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        school: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Users
}