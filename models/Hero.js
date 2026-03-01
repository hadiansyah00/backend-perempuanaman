'use strict';

module.exports = (sequelize, DataTypes) => {
  const Hero = sequelize.define('Hero', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    pageName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    route: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.TEXT,
    },
    backgroundImage: {
      type: DataTypes.STRING,
    },
    fullHeight: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'heroes',
    timestamps: true,
  });

  Hero.associate = (models) => {
    Hero.hasMany(models.HeroCtaButton, { foreignKey: 'heroId', as: 'ctaButtons', onDelete: 'CASCADE' });
    Hero.hasMany(models.HeroStat, { foreignKey: 'heroId', as: 'stats', onDelete: 'CASCADE' });
  };

  return Hero;
};
