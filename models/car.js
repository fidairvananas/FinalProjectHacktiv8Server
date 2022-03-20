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
      Car.belongsTo(models.Type, { foreignKey: "TypeId" });
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
      TypeId: {
        type: DataTypes.INTEGER,
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
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "sale",
        validate: {
          notNull: {
            msg: "Status is required",
          },
          notEmpty: {
            msg: "Status is required",
          },
        },
      },
      subscriptionId: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "none",
        validate: {
          notNull: {
            msg: "Subscription Id is required",
          },
          notEmpty: {
            msg: "Subscription Id is required",
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
