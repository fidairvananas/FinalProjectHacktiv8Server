const { Type, Car, Brand } = require("../models");
const { Op } = require("sequelize");

const getTypes = async (req, res, next) => {
  try {
    const { type } = req.query;
    const query = {};
    if (type) {
      query.where = {
        modelName: {
          [Op.iLike]: `%${type}%`,
        },
      };
    }
    const types = await Type.findAll({
      include: [{ model: Car }, { model: Brand }],
      ...query,
    });
    res.status(200).json(types);
  } catch (err) {
    next(err);
  }
};

const getType = async (req, res, next) => {
  try {
    const id = req.params.id;
    const type = await Type.findByPk(id, {
      include: [
        {
          model: Car,
        },
        {
          model: Brand,
        },
      ],
    });

    if (!type) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Type not found",
      };
    }
    res.status(200).json(type);
  } catch (err) {
    next(err);
  }
};

module.exports = { getTypes, getType };
