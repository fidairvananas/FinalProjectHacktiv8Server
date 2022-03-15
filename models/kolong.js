"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kolong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kolong.belongsTo(models.Inspection, { foreignKey: "InspectionId" });
    }
  }
  Kolong.init(
    {
      oliMesin: DataTypes.BOOLEAN,
      transmission: DataTypes.BOOLEAN,
      minyakRem: DataTypes.BOOLEAN,
      radiator: DataTypes.BOOLEAN,
      aki: DataTypes.BOOLEAN,
      bottomCover: DataTypes.BOOLEAN,
      knalpot: DataTypes.BOOLEAN,
      kestabilanBan: DataTypes.BOOLEAN,
      shockBreaker: DataTypes.BOOLEAN,
      masterBrake: DataTypes.BOOLEAN,
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
      modelName: "Kolong",
    }
  );
  return Kolong;
};
