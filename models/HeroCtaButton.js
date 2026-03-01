'use strict';

module.exports = (sequelize, DataTypes) => {
  const HeroCtaButton = sequelize.define('HeroCtaButton', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    heroId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    href: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    tableName: 'hero_cta_buttons',
    timestamps: false,
  });

  HeroCtaButton.associate = (models) => {
    HeroCtaButton.belongsTo(models.Hero, { foreignKey: 'heroId' });
  };

  return HeroCtaButton;
};
