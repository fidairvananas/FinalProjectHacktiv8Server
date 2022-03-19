const { Kolong } = require("../models");

const getKolong = async (req, res, next) => {
  try {
    const id = req.params.id;

    const kolong = await Kolong.findByPk(id);
    if (!kolong) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Interior inspection not found",
      };
    }

    res.status(200).json(kolong);
  } catch (err) {
    next(err);
  }
};

const changeKolongInsp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      oliMesin,
      transmission,
      minyakRem,
      radiator,
      aki,
      bottomCover,
      knalpot,
      kestabilanBan,
      shockBreaker,
      masterBrake,
    } = req.body;

    const kolong = await Kolong.findByPk(id);
    if (!kolong) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Interior inspection not found",
      };
    }

    await Kolong.update(
      {
        oliMesin,
        transmission,
        minyakRem,
        radiator,
        aki,
        bottomCover,
        knalpot,
        kestabilanBan,
        shockBreaker,
        masterBrake,
      },
      { where: { id } }
    );

    res.status(200).json({ message: "Kolong inspection updated" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getKolong, changeKolongInsp };
