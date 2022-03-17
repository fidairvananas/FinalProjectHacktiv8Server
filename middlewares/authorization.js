const authorization = async (req, res, next) => {
  try {
    const storeName = req.loginDealer.storeName;

    if (storeName) {
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

module.exports = authorization;
