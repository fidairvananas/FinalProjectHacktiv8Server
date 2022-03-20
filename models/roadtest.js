"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoadTest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoadTest.belongsTo(models.Inspection, { foreignKey: "InspectionId" });
    }
  }
  RoadTest.init(
    {
      engineStarting: DataTypes.BOOLEAN,
      engineIdling: DataTypes.BOOLEAN,
      steeringSystem: DataTypes.BOOLEAN,
      acceleration: DataTypes.BOOLEAN,
      engineSound: DataTypes.BOOLEAN,
      brake: DataTypes.BOOLEAN,
      inspectedBy: DataTypes.STRING,
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
      modelName: "RoadTest",
    }
  );
  return RoadTest;
};
