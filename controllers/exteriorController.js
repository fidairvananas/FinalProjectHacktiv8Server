const { Exterior } = require("../models");

const getExterior = async (req, res, next) => {
  try {
    const exteriorId = req.params.id;

    const exterior = await Exterior.findByPk(exteriorId);

    if (!exterior) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Exterior inspection not found",
      };
    }

    res.status(200).json(exterior);
  } catch (err) {
    next(err);
  }
};

const changeExteriorInspection = async (req, res, next) => {
  try {
    const {
      chassis,
      bumper,
      lights,
      roof,
      spion,
      windShield,
      kacaSamping,
      kacaBelakang,
      tire,
    } = req.body;
    const exteriorId = req.params.id;
    const { name } = req.loginAdmin;

    const exterior = await Exterior.findByPk(exteriorId);

    if (!exterior) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Exterior inspection not found",
      };
    }

    await Exterior.update(
      {
        chassis,
        bumper,
        lights,
        roof,
        spion,
        windShield,
        kacaSamping,
        kacaBelakang,
        tire,
        inspectedBy: name,
      },
      {
        where: {
          id: exteriorId,
        },
      }
    );

    res.status(200).json({ message: "exterior Inspection updated" });
  } catch (err) {
    next(err);
  }
};

module.exports = { changeExteriorInspection, getExterior };