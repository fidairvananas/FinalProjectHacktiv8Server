const { RoadTest } = require("../models");

const getRoadTest = async (req, res, next) => {
  try {
    const id = req.params.id;

    const roadTest = await RoadTest.findByPk(id);

    if (!roadTest) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Road inspection not found",
      };
    }

    res.status(200).json(roadTest);
  } catch (err) {
    next(err);
  }
};

const changeRoadTestInsp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      engineStarting,
      engineIdling,
      steeringSystem,
      acceleration,
      engineSound,
      brake,
    } = req.body;

    const roadTest = await RoadTest.findByPk(id);

    if (!roadTest) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Road inspection not found",
      };
    }

    await RoadTest.update(
      {
        engineStarting,
        engineIdling,
        steeringSystem,
        acceleration,
        engineSound,
        brake,
      },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).json({ message: "Road test inspection updated" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getRoadTest, changeRoadTestInsp };
