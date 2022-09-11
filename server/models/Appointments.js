module.exports = (sequelize, DataTypes) => {
    const Appointments = sequelize.define("Appointments", {
        tutor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        student: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
    return Appointments
}