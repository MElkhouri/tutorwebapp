const TutorProfile = require("./TutorProfile");

module.exports = (sequelize, DataTypes) => {
    const Appointments = sequelize.define("Appointments", {
        tutorID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        studentID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tutorName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        studentName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        course: {
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
        },
        isRequest: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    return Appointments
}