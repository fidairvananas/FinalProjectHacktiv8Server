const {
  Inspection,
  Exterior,
  Interior,
  RoadTest,
  Kolong,
} = require("../models");

const getInspections = async (req, res, next) => {
  try {
    const inspections = await Inspection.findAll({
      include: [
        {
          model: Exterior,
        },
        { model: Interior },
        { model: RoadTest },
        { model: Kolong },
      ],
    });
    res.status(200).json(inspections);
  } catch (err) {
    next(err);
  }
};

const getInspection = async (req, res, next) => {
  try {
    const id = req.params.id;
    const inspection = await Inspection.findByPk(id, {
      include: [
        {
          model: Exterior,
        },
        { model: Interior },
        { model: RoadTest },
        { model: Kolong },
      ],
    });

    if (!inspection) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Inspection not found",
      };
    }

    res.status(200).json(inspection);
  } catch (err) {
    next(err);
  }
};

const changeMainInspection = async (req, res, next) => {
  try {
    const { mainInspection } = req.body;
    const inspectionId = req.params.id;
    const { name } = req.loginAdmin;

    const inspection = await Inspection.findByPk(inspectionId);
    if (!inspection) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Inspection not found",
      };
    }

    await Inspection.update(
      { mainInspection: mainInspection, inspectedBy: name },
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
    const { name } = req.loginAdmin;

    if (!inspection) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Inspection not found",
      };
    }

    await Inspection.update(
      { exteriorInspection, inspectedBy: name },
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
    const { name } = req.loginAdmin;

    if (!inspection) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Inspection not found",
      };
    }
    await Inspection.update(
      { interiorInspection, inspectedBy: name },
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
    const { name } = req.loginAdmin;

    if (!inspection) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Inspection not found",
      };
    }

    await Inspection.update(
      { roadTest, inspectedBy: name },
      { where: { id: inspectionId } }
    );

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
    const { name } = req.loginAdmin;

    if (!inspection) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Inspection not found",
      };
    }

    await Inspection.update(
      { kolongTest, inspectedBy: name },
      { where: { id: inspectionId } }
    );

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
  getInspections,
  getInspection,
};
