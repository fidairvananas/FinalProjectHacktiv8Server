const { Interior } = require("../models");

const getInterior = async (req, res, next) => {
  try {
    const { id } = req.params;
    const interior = await Interior.findByPk(id);

    if (!interior) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Interior inspection not found",
      };
    }

    res.status(200).json(interior);
  } catch (err) {
    next(err);
  }
};

const changeInteriorInspection = async (req, res, next) => {
  try {
    const {
      speedometer,
      klakson,
      steeringWheel,
      rearViewMirror,
      dashboard,
      seats,
      gasPedal,
      brakePedal,
    } = req.body;
    const interiorId = req.params.id;
    const { name } = req.loginAdmin;

    const interior = await Interior.findByPk(interiorId);

    if (!interior) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Interior inspection not found",
      };
    }

    await Interior.update(
      {
        speedometer,
        klakson,
        steeringWheel,
        rearViewMirror,
        dashboard,
        seats,
        gasPedal,
        brakePedal,
        inspectedBy: name,
      },
      {
        where: {
          id: interiorId,
        },
      }
    );

    res.status(200).json({ message: "Interior Inspection updated" });
  } catch (err) {
    next(err);
  }
};

module.exports = { changeInteriorInspection, getInterior };
