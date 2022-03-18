"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Inspection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inspection.belongsTo(models.Car, { foreignKey: "CarId" });
      Inspection.hasOne(models.Exterior, { foreignKey: "InspectionId" });
      Inspection.hasOne(models.Interior, { foreignKey: "InspectionId" });
      Inspection.hasOne(models.RoadTest, { foreignKey: "InspectionId" });
      Inspection.hasOne(models.Kolong, { foreignKey: "InspectionId" });
    }
  }
  Inspection.init(
    {
      mainInspection: DataTypes.BOOLEAN,
      exteriorInspection: DataTypes.BOOLEAN,
      interiorInspection: DataTypes.BOOLEAN,
      roadTest: DataTypes.BOOLEAN,
      kolongTest: DataTypes.BOOLEAN,
      CarId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Car id is required",
          },
          notEmpty: {
            msg: "Car id is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Inspection",
    }
  );
  return Inspection;
};
