"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Interior extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Interior.belongsTo(models.Inspection, { foreignKey: "InspectionId" });
    }
  }
  Interior.init(
    {
      speedometer: DataTypes.BOOLEAN,
      klakson: DataTypes.BOOLEAN,
      steeringWheel: DataTypes.BOOLEAN,
      rearViewMirror: DataTypes.BOOLEAN,
      dashboard: DataTypes.BOOLEAN,
      seats: DataTypes.BOOLEAN,
      gasPedal: DataTypes.BOOLEAN,
      brakePedal: DataTypes.BOOLEAN,
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
      modelName: "Interior",
    }
  );
  return Interior;
};
