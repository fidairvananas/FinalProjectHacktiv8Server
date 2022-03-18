const { Inspection } = require("../models");

const changeMainInspection = async (req, res, next) => {
  try {
    const { mainInspection } = req.body;
    const inspectionId = req.params.id;

    const inspection = await Inspection.findByPk(inspectionId);
    if (!inspection) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Inspection not found",
      };
    }

    await Inspection.update(
      { mainInspection },
      { where: { id: inspectionId } }
    );

    res.status(200).json({ message: "Main inspection updated" });
  } catch (err) {
    next(err);
  }
};

const changeExterior = async (req, res, next) => {
  try {
    const { exteriorInspection } = req.body;
    const inspectionId = req.params.id;
    const inspection = await Inspection.findByPk(inspectionId);
    if (!inspection) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Inspection not found",
      };
    }

    await Inspection.update(
      { exteriorInspection },
      { where: { id: inspectionId } }
    );

    res.status(200).json({ message: "Exterior inspection updated" });
  } catch (err) {
    next(err);
  }
};

const changeInterior = async (req, res, next) => {
  try {
    const { interiorInspection } = req.body;
    const inspectionId = req.params.id;
    const inspection = await Inspection.findByPk(inspectionId);
    if (!inspection) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Inspection not found",
      };
    }
    await Inspection.update(
      { interiorInspection },
      { where: { id: inspectionId } }
    );

    res.status(200).json({ message: "Interior inspection updated" });
  } catch (err) {
    next(err);
  }
};

const changeRoadTest = async (req, res, next) => {
  try {
    const { roadTest } = req.body;
    const inspectionId = req.params.id;
    const inspection = await Inspection.findByPk(inspectionId);
    if (!inspection) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Inspection not found",
      };
    }

    await Inspection.update({ roadTest }, { where: { id: inspectionId } });

    res.status(200).json({ message: "Road test inspection updated" });
  } catch (err) {
    next(err);
  }
};

const changeKolong = async (req, res, next) => {
  try {
    const { kolongTest } = req.body;
    const inspectionId = req.params.id;
    const inspection = await Inspection.findByPk(inspectionId);
    if (!inspection) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Inspection not found",
      };
    }

    await Inspection.update({ kolongTest }, { where: { id: inspectionId } });

    res.status(200).json({ message: "Kolong inspection updated" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  changeMainInspection,
  changeExterior,
  changeInterior,
  changeKolong,
  changeRoadTest,
};
