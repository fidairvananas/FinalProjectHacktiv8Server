"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exterior extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exterior.belongsTo(models.Inspection, { foreignKey: "InspectionId" });
    }
  }
  Exterior.init(
    {
      chassis: DataTypes.BOOLEAN,
      bumper: DataTypes.BOOLEAN,
      lights: DataTypes.BOOLEAN,
      roof: DataTypes.BOOLEAN,
      spion: DataTypes.BOOLEAN,
      windShield: DataTypes.BOOLEAN,
      kacaSamping: DataTypes.BOOLEAN,
      kacaBelakang: DataTypes.BOOLEAN,
      tire: DataTypes.BOOLEAN,
      InspectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Inspection id is required",
          },
          notEmpty: {
            msg: "Inspection id is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Exterior",
    }
  );
  return Exterior;
};
