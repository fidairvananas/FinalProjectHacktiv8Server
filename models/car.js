"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.belongsTo(models.Model, { foreignKey: "ModelId" });
      Car.belongsTo(models.Dealer, { foreignKey: "DealerId" });
      Car.hasMany(models.Image, { foreignKey: "CarId" });
      Car.hasOne(models.Inspection, { foreignKey: "CarId" });
    }
  }
  Car.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Car name is required",
          },
          notEmpty: {
            msg: "Car name is required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description is required",
          },
          notEmpty: {
            msg: "Description is required",
          },
        },
      },
      fuel: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Fuel is required",
          },
          notEmpty: {
            msg: "Fuel is required",
          },
        },
      },
      seats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Seats is required",
          },
          notEmpty: {
            msg: "Seats is required",
          },
        },
      },
      mileage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Mileage is required",
          },
          notEmpty: {
            msg: "Mileage is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price is required",
          },
          notEmpty: {
            msg: "Price is required",
          },
        },
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Color is required",
          },
          notEmpty: {
            msg: "Color is required",
          },
        },
      },
      yearMade: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Make Year is required",
          },
          notEmpty: {
            msg: "Make Year is required",
          },
        },
      },
      passedInspection: DataTypes.BOOLEAN,
      DealerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Dealer Id is required",
          },
          notEmpty: {
            msg: "Dealer Id is required",
          },
        },
      },
      ModelId: {
        type: DataTypes.INTEGER,
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
    },
    {
      sequelize,
      modelName: "Car",
    }
  );
  return Car;
};
