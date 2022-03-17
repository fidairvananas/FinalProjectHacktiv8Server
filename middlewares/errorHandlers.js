const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "NOT_FOUND":
      res.status(err.code).json({ message: err.message });
      break;
    case "UNAUTHORIZED":
      res.status(err.code).json({ message: err.message });
      break;
    case "INVALID_TOKEN":
      res.status(err.code).json({ message: err.message });
      break;
    case "FORBIDDEN":
      res.status(err.code).json({ message: err.message });
      break;
    case "JsonWebTokenError":
      res.status(400).json({ message: err.message });
      break;
    case "TokenExpiredError":
      res.status(400).json({ message: err.message });
      break;
    case "BAD_REQUEST":
      res.status(err.code).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

//ganti jadi switch case

module.exports = errorHandler;
