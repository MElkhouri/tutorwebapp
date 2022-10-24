module.exports = (sequelize, DataTypes) => {
    const TutorProfile = sequelize.define("TutorProfile", {
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
            allowNull: false,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: false,
        }        
    });
    return TutorProfile
}