const { generatePayload } = require("../helpers/jwt");
const { Dealer } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    const payload = generatePayload(access_token);

    const dealer = await Dealer.findByPk(payload.id);

    if (!dealer) {
      throw {
        code: 401,
        name: "INVALID_TOKEN",
        message: "Invalid token or user",
      };
    }

    req.loginDealer = {
      id: dealer.id,
      role: dealer.role,
      email: dealer.email,
      storeName: dealer.storeName,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
