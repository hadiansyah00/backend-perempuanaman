'use strict';

module.exports = (sequelize, DataTypes) => {
  const HeroStat = sequelize.define('HeroStat', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    heroId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    tableName: 'hero_stats',
    timestamps: false,
  });

  HeroStat.associate = (models) => {
    HeroStat.belongsTo(models.Hero, { foreignKey: 'heroId' });
  };

  return HeroStat;
};
