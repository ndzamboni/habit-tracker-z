'use strict';

module.exports = (sequelize, DataTypes) => {
    const Habit = sequelize.define('Habit', {
        name: DataTypes.STRING,
        userID: DataTypes.INTEGER,
    }, {});
    Habit.associate = function(models) {
        // associations can be defined here
        Habit.belongsTo(models.User, { foreignKey: 'userId'});
        Habit.hasMany(models.Record, { foreignKey: 'habitId'});
    };
    return Habit;
};