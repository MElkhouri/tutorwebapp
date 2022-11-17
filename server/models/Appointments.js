const TutorProfile = require("./TutorProfile");

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
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Appointments
}