const { generatePayload } = require("../helpers/jwt");
const { Admin } = require("../models");

const adminAuthentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    const payload = generatePayload(access_token);

    if (!payload.role) {
      throw {
        code: 401,
        name: "INVALID_TOKEN",
        message: "Invalid token or user",
      };
    }

    const admin = await Admin.findOne({ where: { role: payload.role } });
    console.log(admin);

    req.loginAdmin = {
      id: admin.id,
      name: admin.name,
      role: admin.role,
      email: admin.email,
      phoneNumber: admin.phoneNumber,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = adminAuthentication;
