const { Brand, Type } = require("../models");

const getBrands = async (req, res, next) => {
  try {
    const brands = await Brand.findAll({
      include: [
        {
          model: Type,
        },
      ],
    });
    res.status(200).json(brands);
  } catch (err) {
    next(err);
  }
};

module.exports = getBrands;
