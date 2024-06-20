module.exports = (sequelize, DataTypes) => {
  const HabitEntry = sequelize.define('HabitEntry', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    habitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  HabitEntry.associate = (models) => {
    HabitEntry.belongsTo(models.Habit, { foreignKey: 'habitId' });
  };

  return HabitEntry;
};
