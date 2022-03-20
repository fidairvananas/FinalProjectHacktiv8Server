const { Op } = require("sequelize");
const { Brand, Type, Car } = require("../models");

const getBrands = async (req, res, next) => {
  try {
    const { brand } = req.query;
    const query = {};
    if (brand) {
      query.where = {
        name: {
          [Op.iLike]: `%${brand}%`,
        },
      };
    }

    const brands = await Brand.findAll({
      include: [
        {
          model: Type,
          include: {
            model: Car,
          },
        },
      ],
      ...query,
    });
    res.status(200).json(brands);
  } catch (err) {
    next(err);
  }
};

module.exports = getBrands;
