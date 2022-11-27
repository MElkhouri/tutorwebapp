const Appointments = require("./Appointments");
module.exports = (sequelize, DataTypes) => {
    const TutorProfiles = sequelize.define("TutorProfiles", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        courses: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
        },            
    });
    TutorProfiles.associate = (models) => {
        TutorProfiles.hasMany(models.Appointments, {
            foreignKey: 'tutor',
        });
    }
    
    return TutorProfiles
}