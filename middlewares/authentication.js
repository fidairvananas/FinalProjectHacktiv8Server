const { generatePayload } = require("../helpers/jwt");
const { Dealer } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    const payload = generatePayload(access_token);

    if (!payload.storeName) {
      throw {
        code: 401,
        name: "INVALID_TOKEN",
        message: "Invalid token or user",
      };
    }

    const dealer = await Dealer.findOne({
      where: {
        storeName: payload.storeName,
      },
    });

    req.loginDealer = {
      id: dealer.id,
      name: dealer.name,
      email: dealer.email,
      storeName: dealer.storeName,
      storeAddress: dealer.storeAddress,
      phoneNumber: dealer.phoneNumber,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
