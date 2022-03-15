"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Model.hasMany(models.Car, { foreignKey: "ModelId" });
      Model.belongsTo(models.Brand, { foreignKey: "BrandId" });
    }
  }
  Model.init(
    {
      modelName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Model is required",
          },
          notEmpty: {
            msg: "Model is required",
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
      modelName: "Model",
    }
  );
  return Model;
};
