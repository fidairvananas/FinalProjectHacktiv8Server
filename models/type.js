"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Type.hasMany(models.Car, { foreignKey: "TypeId" });
      Type.belongsTo(models.Brand, { foreignKey: "BrandId" });
    }
  }
  Type.init(
    {
      modelName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Type is required",
          },
          notEmpty: {
            msg: "Type is required",
          },
        },
      },
      BrandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Brand is required",
          },
          notEmpty: {
            msg: "Brand is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Type",
    }
  );
  return Type;
};
