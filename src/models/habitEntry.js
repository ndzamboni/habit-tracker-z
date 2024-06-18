'use strict';
module.exports = (sequelize, DataTypes) => {
    const HabitEntry = sequelize.define('HabitEntry', {
        date: DataTypes.DATE,
        habitId: DataTypes.INTEGER,
    }, {});
    HabitEntry.associate = function(models) {
        // associations can be defined here
        HabitEntry.belongsTo(models.Habit, { foreignKey: 'habitId'});

    };
    return HabitEntry;
};

