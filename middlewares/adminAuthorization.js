const adminAuthorization = async (req, res, next) => {
  try {
    const role = req.loginAdmin.role;

    if (role === "Admin") {
      next();
    } else {
      throw {
        code: 403,
        name: "FORBIDDEN",
        message: "You are not authorized to access this resource",
      };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = adminAuthorization;
