module.exports = (sequelize, DataTypes) => {
  const Habit = sequelize.define('Habit', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Habit.associate = (models) => {
    Habit.belongsTo(models.User, { foreignKey: 'userId' });
    Habit.hasMany(models.HabitEntry, { foreignKey: 'habitId' });
  };

  return Habit;
};
